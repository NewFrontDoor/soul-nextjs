import React from 'react';
import {GetServerSideProps} from 'next';
import {Container} from '@theme-ui/components';
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../utils/block-text-serializer';
import Layout from '../components/layout';

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
      </Container>
    </Layout>
  );
};

Page.propTypes = {
  menuData: PropTypes.object.isRequired,
  mainData: PropTypes.object.isRequired
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let slug = query.slug;

  if (Array.isArray(slug)) {
    slug = slug[0];
  }

  const pageQuery = `
    *[_type == "page" && '${slug}' match slug.current][0] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @-> {
          ...,
          "blocks": [
            ...blocks[_type == 'reference']->{
              key,
              title,
              "description": preview[_type != 'reference'],
              mainImage,
              "link": {
                "type": "slug",
                "url": slug.current
              },
            },
            ...blocks[_type == 'griditem']{
              key,
              title,
              description,
              mainImage,
              "link": {
                "url": link
              }
            }
          ]
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
  const props = await fetchQuery(
    `{
        "mainData": ${pageQuery},
        "menuData": ${menuQuery}
    }`
  );
  return {props};
};

export default Page;
