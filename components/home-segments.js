/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {AudioPlayer} from '@newfrontdoor/audio-player';
import urlFor from '../utils/sanity-img';
import GoogleMap from './models/google-map';
import UpcomingEvent from './models/upcoming-event';

function Events({events}) {
  return events
    ? events.slice(0, 5).map(event => {
        return (
          <UpcomingEvent
            key={event.name + event.start_date}
            title={event.name}
            startdate={event.start_date}
          />
        );
      })
    : 'Loading, please wait...';
}

function Map() {
  return (
    <GoogleMap
      location={{lat: -31.9716063, lng: 115.8918229}}
      height="360px"
      mapWidth="100%"
    />
  );
}

function Sermon({sermonData}) {
  const {_id, image, title, passage, url} = sermonData[0];
  return title ? (
    <div>
      <img
        alt={title}
        sx={{display: 'flex', margin: 'auto', height: '150px'}}
        src={urlFor(image)
          .maxHeight(150)
          .fit('fill')
          .url()}
      />
      <Link href="/sermons/[_id]" as={`/sermon/${_id}`}>
        <Styled.a>
          <Styled.h4 sx={{marginTop: '8px'}}>{title}</Styled.h4>
        </Styled.a>
      </Link>
      <Styled.h5>{passage}</Styled.h5>
      <AudioPlayer
        hasPlaybackspeed
        audio={url}
        hasBorder={false}
        isInvert={false}
      />
      <Styled.a sx={{color: 'text'}} href={url}>
        download now
      </Styled.a>
      <br />
      <Link passHref href="/sermons" as="/sermons">
        <Styled.a sx={{color: 'light'}}>view all sermons</Styled.a>
      </Link>
    </div>
  ) : (
    'loading...'
  );
}

function Wrapper({segment: {heading, description}, children}) {
  return (
    <section>
      <Styled.h2 sx={{mb: 10}}>{heading}</Styled.h2>
      <Styled.h4 sx={{mt: 16}}>{description}</Styled.h4>
      {children}
    </section>
  );
}

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

const segments = props => ({
  sermons: <Sermon {...props} />,
  events: <Events {...props} />,
  map: <Map {...props} />
});

export default segments;
