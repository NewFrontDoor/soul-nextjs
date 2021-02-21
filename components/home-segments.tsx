/** @jsx jsx */
import {jsx, Image, Styled} from 'theme-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {AudioPlayer} from '@newfrontdoor/audio-player';
import urlFor, {SanityImageSource} from '../utils/sanity-img';
import GoogleMap from './models/google-map';
import UpcomingEvent from './models/upcoming-event';

type EventsProps = {
  events?: Array<{
    name: string;
    start_date: string;
  }>;
};

const Events = ({events}: EventsProps) => {
  return events ? (
    <>
      {events.slice(0, 5).map((event) => (
        <UpcomingEvent
          key={`${event.name}${event.start_date}`}
          title={event.name}
          startdate={event.start_date}
        />
      ))}
    </>
  ) : (
    <p>Loading, please wait...</p>
  );
};

const Map = () => {
  return (
    <GoogleMap
      location={{lat: -31.9716063, lng: 115.8918229}}
      height="360px"
      width="100%"
    />
  );
};

export type SermonData = {
  _id: string;
  image: SanityImageSource;
  title: string;
  passage: string;
  url: string;
};

type SermonProps = {
  sermonData: SermonData[];
};

const Sermon = ({sermonData}: SermonProps) => {
  const {_id, image, title, passage, url} = sermonData[0];
  return title ? (
    <div>
      <Image
        alt={title}
        sx={{display: 'flex', margin: 'auto', height: '150px'}}
        src={urlFor(image).maxHeight(150).fit('fill').url()}
      />
      <Link passHref href={`/sermons/${_id}`}>
        <Styled.a>
          <Styled.h4 sx={{marginTop: '8px'}}>{title}</Styled.h4>
        </Styled.a>
      </Link>
      <Styled.h5>{passage}</Styled.h5>
      <AudioPlayer
        hasPlaybackspeed
        src={url}
        hasBorder={false}
        isInvert={false}
      />
      <Styled.a sx={{color: 'text'}} href={url}>
        download now
      </Styled.a>
      <br />
      <Link passHref href="/sermons">
        <Styled.a sx={{color: 'light'}}>view all sermons</Styled.a>
      </Link>
    </div>
  ) : (
    <p>loading...</p>
  );
};

const Wrapper = ({segment: {heading, description}, children}) => {
  return (
    <section>
      <Styled.h2 sx={{mb: 10}}>{heading}</Styled.h2>
      <Styled.h3 sx={{mt: 16}}>{description}</Styled.h3>
      {children}
    </section>
  );
};

Sermon.propTypes = {
  sermonData: PropTypes.array.isRequired
};

Events.propTypes = {
  events: PropTypes.array.isRequired
};

Wrapper.propTypes = {
  segment: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};

const segments = (props) => ({
  sermons: <Sermon {...props} />,
  events: <Events {...props} />,
  map: <Map {...props} />
});

export default segments;
