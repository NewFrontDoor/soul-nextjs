import * as builder from 'xmlbuilder';
import {fetchQuery} from '../../lib/sanity';

const buildFeedObject = ({
  title,
  url,
  filesize,
  description,
  pubDate,
  duration,
  passage,
  preacher
}) => {
  return {
    title: {'#text': title},
    link: {'#text': url},
    description: {'#text': description},
    enclosure: {
      '@url': url,
      '@type': 'audio/mpeg',
      '@length': filesize
    },
    guid: {
      '@isPermaLink': 'false',
      '#text': url
    },
    pubDate: {'#text': pubDate.split('T')[0]},
    'itunes:subtitle': {'#text': passage},
    'itunes:summary': {'#text': description},
    'itunes:duration': {'#text': duration},
    'itunes:author': {'#text': preacher}
  };
};

const Podcast = () => null;

Podcast.getInitialProps = async ({res}) => {
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
    } | order(preachedDate desc)
    `;

  try {
    const sermonData = await fetchQuery(sermonQuery);
    const feedObject = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
        url: []
      }
    };

    for (const item of sermonData) {
      if (typeof item.url !== 'undefined') {
        feedObject.urlset.url.push(buildFeedObject(item));
      }
    }

    const podcast = builder.create(feedObject, {encoding: 'utf-8'});

    if (res) {
      res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
      res.setHeader('Content-Type', 'application/xml');
      res.statusCode = 200;
      res.end(podcast.end({pretty: true}));
    }

    return;
  } catch (error) {
    return {error: 404};
  }
};

export default Podcast;
