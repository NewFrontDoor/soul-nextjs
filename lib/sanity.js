import {createContext} from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'i824j5nt',
  dataset: 'production',
  useCdn: true
});

export const SanityContext = createContext(client);

export function fetchQuery(query, params) {
  return client.fetch(query, params);
}

export default client;
