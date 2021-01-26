import React from 'react';
import {Container} from '@theme-ui/components';
import PropTypes from 'prop-types';
import {fetchQuery} from '../../lib/sanity';
import SanityBlock from '../../utils/block-text-serializer';
import Layout from '../../components/layout';

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

const Page = ({menuData, mainData}) => {
  const {body} = mainData;
  return (
    <Layout menuData={menuData} mainData={mainData}>
      <Container>
        <SanityBlock blocks={body} />
        <p>HERE IS WHERE THE SERMON TABLE WILL GO</p>
      </Container>
    </Layout>
  );
};

Page.propTypes = {
  menuData: PropTypes.object.isRequired,
  mainData: PropTypes.object.isRequired
};

Page.getInitialProps = async () => {
  const pageQuery = `
    *[_type == "page" && 'sermon' match slug.current][0] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @-> {
          ...,
          blocks[] {
            ...,
            _type == 'reference' => @ -> {
              "_type": "griditem",
              "description": body,
              "header": title,
              "image": mainImage,
              "link": slug
            },
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
      "mainImage": *[_id == 'global-main'][0].hero{
        ...,
        asset->
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
