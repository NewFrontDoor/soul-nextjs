import {promisify} from 'util';
import stream from 'stream';
import got from 'got';

const pipeline = promisify(stream.pipeline);

const elvantoApi = got.extend({
  headers: {
    authorization: `Basic ${process.env.ELVANTO_TOKEN}`
  },
  prefixUrl: 'https://api.elvanto.com/v1'
});

async function Endpoint(req, res) {
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

  await pipeline(
    elvantoApi.stream.post('calendar/events/getAll.json', {
      json: query
    }),
    res
  );
}

export default Endpoint;
