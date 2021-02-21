import {createContext} from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'i824j5nt',
  dataset: 'production',
  useCdn: true
});

export const SanityContext = createContext(client);

export async function fetchQuery<T>(
  query: string,
  parameters?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, parameters);
}

export default client;
