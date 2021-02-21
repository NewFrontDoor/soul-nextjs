/** @jsx jsx */
import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ThemeProvider, Styled, Box, Flex, Image, jsx} from 'theme-ui';
import {MdEmail as Email, MdMap as Map} from 'react-icons/md';
import {FaPodcast as Podcast, FaCalendarAlt as Calendar} from 'react-icons/fa';
import PropTypes from 'prop-types';
import theme from '../lib/theme';
import urlFor, {SanityImageSource} from '../utils/sanity-img';
import CompButton from './comp-button';
import Footer from './footer';
import Navigation, {NavigationProps} from './navigation';

type CoverImageProps = {
  img?: SanityImageSource;
  children: React.ReactNode;
};

const CoverImage = (props: CoverImageProps) => (
  <Box
    sx={{
      backgroundImage: `url(${
        props.img?.asset?.metadata ? props.img.asset.metadata.lqip : ''
      })`,
      backgroundSize: 'cover',
      width: '100%',
      height: '250px',
      overflow: 'hidden',
      marginTop: '40px'
    }}
    {...props}
  />
);

const icons = {
  email: <Email />,
  podcast: <Podcast />,
  calendar: <Calendar />,
  map: <Map />
};

type LayoutProps = {
  menuData: {
    menuitems: NavigationProps['menuitems'];
  };
  mainData: {
    mainImage?: SanityImageSource;
    cta?: {
      icon: string;
      text: string;
    };
    title: string;
    seo?: {
      title?: string;
      metaDescription?: string;
      socialImage?: SanityImageSource;
    };
  };
  children: React.ReactNode;
};

const Layout = ({menuData, children, mainData}: LayoutProps) => {
  const router = useRouter();
  const {slug} = router.query;
  const {mainImage, cta, title, seo} = mainData;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title} | Soul Church</title>
        <meta property="og:type" content="website" />
        {seo?.title && (
          <meta
            name="og:title"
            property="og:title"
            content={seo.title || title}
          />
        )}
        {seo?.metaDescription && (
          <meta
            name="og:description"
            property="og:description"
            content={seo.metaDescription}
          />
        )}
        <meta property="og:site_name" content="Soul Church" />
        <meta property="og:locale" content="en_AU" />
        <meta
          property="og:url"
          content={`https://soulchurch.org.au${router.asPath}`}
        />
        {seo?.socialImage ? (
          <meta
            property="og:image"
            content={urlFor(seo.socialImage).format('jpg').url()}
          />
        ) : (
          <meta
            property="og:image"
            content={urlFor(mainImage).format('jpg').url()}
          />
        )}
      </Head>
      <Navigation {...menuData} />
      {slug === 'null' ? (
        ''
      ) : (
        <React.Fragment>
          <CoverImage img={mainImage}>
            <picture>
              <source
                srcSet={urlFor(mainImage)
                  .height(250)
                  .width(1400)
                  .format('webp')
                  .fit('max')
                  .url()}
                type="image/webp"
              />
              <Image
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  objectPosition: '0 0'
                }}
                src={urlFor(mainImage)
                  .height(250)
                  .width(1400)
                  .format('jpg')
                  .fit('max')
                  .url()}
              />
            </picture>
          </CoverImage>
          <Flex
            sx={{
              backgroundColor: 'banner',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '96px',
              padding: '0 10vw'
            }}
          >
            <Styled.h1 sx={{fontWeight: 'body', margin: '0'}}>
              {title}
            </Styled.h1>
            {cta && (
              <CompButton
                icon={icons[cta.icon]}
                text={cta.text}
                color="banner"
              />
            )}
          </Flex>
        </React.Fragment>
      )}
      {children}
      <Footer />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

export default Layout;

const HomeLayout = ({menuData, children, mainData}: LayoutProps) => {
  const {title, metaDescription, socialImage} = mainData.seo;
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title} | Soul Church</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={title} />
        <meta
          name="og:description"
          property="og:description"
          content={metaDescription}
        />
        <meta property="og:site_name" content="Soul Church" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:url" content="https://soulchurch.org.au/" />
        <meta
          property="og:image"
          content={urlFor(socialImage)
            .height(250)
            .width(1400)
            .format('jpg')
            .fit('max')
            .url()}
        />
      </Head>
      <Navigation {...menuData} />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.element.isRequired,
  menuData: PropTypes.object.isRequired
};

export {HomeLayout};
