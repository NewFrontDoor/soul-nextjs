import imageUrlBuilder from '@sanity/image-url';
import myConfiguredSanityClient from '../lib/sanity';

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(myConfiguredSanityClient);

type AssetMetaData = {
  asset?: {
    metadata?: {
      lqip: string;
    };
  };
};

export type SanityImageSource = Parameters<typeof builder.image> &
  AssetMetaData;
export type ImageUrlBuilder = ReturnType<typeof builder.image>;

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

export default urlFor;
