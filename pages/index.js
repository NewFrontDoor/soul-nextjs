/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ky from 'ky-universal';
import hostUrl from '../lib/host-url';
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

const soulApi = ky.create({
  prefixUrl: hostUrl
});

Home.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery},
        "sermonData": ${sermonQuery}
    }`
  );
  const {
    events: {event}
  } = await soulApi('api/events').json();
  results.events = event;

  return results;
};

export default Home;
