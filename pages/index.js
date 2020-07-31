/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import urlFor from '../utils/sanity-img';
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

const Wrapper = ({segment: {heading, description}, children}) => {
  return (
    <section>
      <Styled.h2 sx={{mb: 10}}>{heading}</Styled.h2>
      <Styled.h4 sx={{mt: 10}}>{description}</Styled.h4>
      {children}
    </section>
  );
};

const Home = ({mainData, menuData, sermonData, events}) => {
  const {content, hero} = mainData;
  return (
    <HomeLayout menuData={menuData} mainData={mainData}>
      <section>
        <SliderWrapper>
          <picture>
            <source
              srcSet={urlFor(hero)
                .height(600)
                .width(1440)
                .format('webp')
                .fit('max')
                .url()}
              type="image/webp"
            />
            <SliderImg
              className="img-responsive img-full-width"
              src={urlFor(hero)
                .height(600)
                .width(1440)
                .format('webp')
                .fit('max')
                .url()}
            />
          </picture>
        </SliderWrapper>
        <Section>
          {content.map((segment) => {
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
  );
};

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

export async function getServerSideProps() {
  const results = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery},
        "sermonData": ${sermonQuery}
    }`
  );

  const now = new Date();
  const query = {
    page: 1,
    page_size: 10,
    start: now.toISOString().split('T')[0],
    end: new Date(now.getFullYear() + 1, 11, 1).toISOString().split('T')[0],
    calendar: [
      '584d565f-0625-454d-9649-a3b9df469d4d',
      '5d40dfdc-d3a5-446d-9e1f-0c6064f723a8',
      '82344fc7-1be9-4724-be7c-3742d4de441c',
      '92054db2-bb14-473a-8e1b-de5fd49bea69',
      '9d41c2ba-39b2-11e6-bedb-061a3b9c64af',
      'feb96937-7310-47db-a4f1-50d58753f9ad'
    ]
  };

  const response = await fetch(
    'https://api.elvanto.com/v1/calendar/events/getAll.json',
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SOUL_ELVANTO_TOKEN}:`
        ).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const {events} = await response.json();

  results.events = events.event;

  return {
    props: results
  };
}

export default Home;
