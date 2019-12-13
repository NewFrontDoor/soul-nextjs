/** @jsx jsx */
import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ThemeProvider, Styled, jsx} from 'theme-ui';
import styled from '@emotion/styled';
import {MdEmail as Email, MdMap as Map} from 'react-icons/md';
import {FaPodcast as Podcast, FaCalendarAlt as Calendar} from 'react-icons/fa';
import PropTypes from 'prop-types';
import theme from '../lib/theme';
import urlFor from '../utils/sanity-img';
import CompButton from './comp-button';
import Footer from './footer';
import Navigation from './navigation';
import '../style.css';

const CoverImage = styled('div')`
  background-image: url(${props =>
    props.img ? props.img.asset.metadata.lqip : ''});
  background-size: cover;
  width: 100%;
  height: 250px;
  overflow: hidden;
  margin-top: 40px;
`;

const InnerImg = styled('img')`
  object-fit: cover;
  object-position: 0 0;
`;

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  background-color: ${props => props.background};
  padding: 0 10vw;
`;

const icons = {
  email: <Email />,
  podcast: <Podcast />,
  calendar: <Calendar />,
  map: <Map />
};

export default function Layout({menuData, children, mainData, defaultImage}) {
  const router = useRouter();
  const {slug} = router.query;
  const {mainImage, cta, title} = mainData;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Soul Church</title>
        </Head>
        <Navigation menuData={menuData} />
        {slug !== 'null' ? (
          <React.Fragment>
            <CoverImage img={mainImage}>
              <InnerImg
                src={
                  urlFor(mainImage)
                    .height(250)
                    .width(1400)
                    .format('webp')
                    .fit('max')
                    .url() || defaultImage
                }
              />
            </CoverImage>
            <Flex sx={{backgroundColor: 'banner'}}>
              <Styled.h1 sx={{fontWeight: 'body', margin: '0'}}>
                {title}
              </Styled.h1>
              {cta && (
                <div>
                  <CompButton
                    icon={icons[cta.icon]}
                    text={cta.text}
                    color="banner"
                    size={1.5}
                  />
                </div>
              )}
            </Flex>
          </React.Fragment>
        ) : (
          ''
        )}
        ;{children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  defaultImage: PropTypes.string.isRequired,
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

function HomeLayout({menuData, children}) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Soul Church</title>
        </Head>
        <Navigation menuData={menuData} />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
  menuData: PropTypes.object.isRequired
};

export {HomeLayout};
