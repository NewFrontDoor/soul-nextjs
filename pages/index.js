/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ky from 'ky-universal';
import slider from '../public/main-grey-scale.png';
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
      <Styled.h4>{description}</Styled.h4>
      {children}
    </section>
  );
}

function Home({mainData, menuData, sermonData, events}) {
  const {content} = mainData;
  return (
    <div>
      <HomeLayout menuData={menuData}>
        <section>
          <SliderWrapper>
            <SliderImg
              className="img-responsive img-full-width"
              src={slider}
              width="1440"
              height="600"
            />
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
	hero
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
  *[_type == "sermons"] {
    "key": _id,
    title,
    _id,
    preachedDate,
    "preacher": preacher->name,
    "series": series->title,
    passage,
    "image": series->image,
    "url": "https://s3.us-west-2.amazonaws.com/sermons.onewaymargate.org/" + file,
    "slug": slug.current
  } | order(preachedDate desc)
  `;

const kyapi = ky.create({
  prefixUrl: 'http://localhost:3000',
  method: 'post'
});

Home.getInitialProps = async () => {
  const complexQuery = {
    method: 'post',
    query: {
      page: 1,
      page_size: 10,
      start: new Date().toISOString().split('T')[0],
      end: new Date(new Date().getFullYear() + 1, 11, 1)
        .toISOString()
        .split('T')[0],
      calendar: [
        '584d565f-0625-454d-9649-a3b9df469d4d',
        '5d40dfdc-d3a5-446d-9e1f-0c6064f723a8',
        '82344fc7-1be9-4724-be7c-3742d4de441c',
        '92054db2-bb14-473a-8e1b-de5fd49bea69',
        '9d41c2ba-39b2-11e6-bedb-061a3b9c64af',
        'feb96937-7310-47db-a4f1-50d58753f9ad'
      ]
    }
  };
  const results = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery},
        "sermonData": ${sermonQuery}
    }`
  );
  results.events = await kyapi('api/events', {
    body: JSON.stringify(complexQuery)
  }).json();
  return results;
};

export default Home;
