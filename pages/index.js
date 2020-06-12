/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
//import ky from 'ky-universal';
import hostUrl from '../lib/host-url';
import urlFor from '../utils/sanity-img';
// Import Carousel from '../carousel/carousel';
import segments from '../components/home-segments';
import {fetchQuery} from '../lib/sanity';
import {HomeLayout} from '../components/layout';

const SliderImg = styled('img')`
  width: 100%;
  height: auto;
`;

const SliderWrapper = styled('div')`
  margin-top: 40px;
  text-align: center;
  height: 550px;
  overflow: hidden;
`;

const Section = styled('section')`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  max-width: 85vw;
  @media (min-width: 770px) {
    max-width: 1170px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

function Wrapper({segment: {heading, description}, children}) {
  return (
    <section>
      <Styled.h2 sx={{mb: 10}}>{heading}</Styled.h2>
      <Styled.h4 sx={{mt: 10}}>{description}</Styled.h4>
      {children}
    </section>
  );
}

function Home({mainData, menuData, sermonData, events}) {
  const {content, hero} = mainData;
  return (
    <div>
      <HomeLayout menuData={menuData} mainData={mainData}>
        <section>
          <SliderWrapper>
            <picture>
              <source
                srcSet={`${urlFor(hero)
                  .height(600)
                  .width(1440)
                  .format('webp')
                  .fit('max')
                  .url()}&sat=-100`}
                type="image/webp"
              />
              <SliderImg
                className="img-responsive img-full-width"
                src={`${urlFor(hero)
                  .height(600)
                  .width(1440)
                  .format('jpg')
                  .fit('max')
                  .url()}&sat=-100`}
              />
            </picture>
          </SliderWrapper>
          <Section>
            {content.map(segment => {
              const props = {segment, sermonData, events};
              return (
                <Wrapper key={segment.type} segment={segment}>
                  {segments(props)[segment.type]}
                </Wrapper>
              );
            })}
          </Section>
        </section>
      </HomeLayout>
    </div>
  );
}

Home.propTypes = {
  events: PropTypes.array.isRequired,
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
  sermonData: PropTypes.array.isRequired
};

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  segment: PropTypes.object.isRequired
};

const mainQuery = `
*[_type == "main"][0] {
  content[]{
    description,
    heading,
    mobile,
    type,
    _key
  },
  hero,
  seo
}
`;

const menuQuery = `
*[_type == "main"][0] {
  menuitems[]{
    "subtext": description,
    "title": text,
    childpages[]->{
      title,
      slug,
      'pathname': '/' + slug.current
    }
  }
}
`;

const sermonQuery = `
  *[_type == "sermon"] {
    "key": _id,
    title,
    _id,
    preachedDate,
    "preacher": preacher->name,
    "series": series->title,
    passage,
    "image": series->image,
    "url": "https://s3-ap-southeast-2.amazonaws.com/sermons.soulchurch.org.au/" + file,
    "slug": slug.current
  } | order(preachedDate desc)
  `;

Home.getInitialProps = async ({req}) => {
  const results = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery},
        "sermonData": ${sermonQuery}
    }`
  );
  const {events: {event}} = await fetch(new URL('api/events', hostUrl(req))).then(response => response.json());
  results.events = event;

  return results;
};

export default Home;
