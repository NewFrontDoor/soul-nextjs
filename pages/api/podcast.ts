import {NextApiRequest, NextApiResponse} from 'next';
import Feed from '@newfrontdoor/itunes-feed';
import {fetchQuery} from '../../lib/sanity';

type Sermon = {
  key: string;
  title: string;
  _id: string;
  pubDate: string;
  preachedDate: string;
  description: string;
  filesize: string;
  duration: string;
  preacher: string;
  series: string;
  passage: string;
  image: string;
  url: string;
  slug: string;
};

let feed: Feed;

async function podcast(_request: NextApiRequest, response: NextApiResponse) {
  const sermonQuery = `
    *[_type == "sermon"] {
    "key": _id,
    title,
    _id,
    "pubDate": _createdAt,
    preachedDate,
    description,
    filesize,
    duration,
    "preacher": preacher->name,
    "series": series->title,
    passage,
    "image": series->image,
    "url": "https://s3-ap-southeast-2.amazonaws.com/sermons.soulchurch.org.au/" + file,
    "slug": slug.current
  } | order(preachedDate desc) [0..100]
    `;

  try {
    const sermonData = await fetchQuery<Sermon[]>(sermonQuery);

    if (typeof feed === 'undefined') {
      feed = new Feed({
        description: 'Soul Presbyterian Church',
        itunesCategory: 'Religion & Spirituality',
        itunesExplicit: false,
        itunesImage: 'some url', // FIXME: need a real image 1400x1400
        language: 'en',
        link: 'https://soulchurch.org.au/',
        title: 'Soul Presbyterian Church'
      });
    }

    for (const item of sermonData) {
      if (typeof item.url !== 'undefined') {
        feed.addItem({
          guid: item.key,
          title: item.title,
          description: item.description,
          enclosure: {
            url: item.url,
            length: 0, // FIXME: what is length
            type: 'audio/mpeg'
          },
          pubDate: new Date(item.pubDate),
          link: new URL(`/sermons/${item.key}`, 'https://soulchurch.org.au')
            .href
        });
      }
    }

    const xml = await feed.render();

    response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
    response.setHeader('Content-Type', 'application/xml');
    response.status(200).send(xml);
  } catch {
    response.status(404).send('Ohno');
  }
}

export default podcast;
