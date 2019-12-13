import React, {useEffect} from 'react';
import {Container} from '@theme-ui/components';
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../utils/block-text-serializer';
import Layout from '../components/layout';
import defaultImage from '../public/main-grey-scale.png';

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

function Page({menuData, mainData}) {
  const {body} = mainData;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout menuData={menuData} mainData={mainData} defaultImage={defaultImage}>
      <Container>
        <SanityBlock blocks={body} />
      </Container>
    </Layout>
  );
}

Page.propTypes = {
  menuData: PropTypes.array.isRequired,
  mainData: PropTypes.object.isRequired
};

Page.getInitialProps = async ({query}) => {
  const pageQuery = `
    *[_type == "page" && slug.current match '${query.slug}'][0] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @-> {
          ...,
          blocks[] {
            ...,
            _type == 'reference' => @ ->,
            "image": image.asset->url,
            "link": link[0].url
          }
        },
        markDefs[] {
          ...,
          _type == 'internalLink' => {
              'slug': @.reference->slug.current
          }
        }
      },
      mainImage{
        ...,
        asset->
      },
      'id': _id,
    }
  `;
  const results = await fetchQuery(
    `{
        "mainData": ${pageQuery},
        "menuData": ${menuQuery}
    }`
  );
  return results;
};

export default Page;
