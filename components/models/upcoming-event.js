/** @jsx jsx */
import {jsx, Box, Flex, Heading, Text} from 'theme-ui';
import PropTypes from 'prop-types';
import {IoIosCalendar} from 'react-icons/io';

const UpcomingEvent = ({title, startdate}) => {
  return (
    <Flex
      p={2}
      mb={2}
      sx={{
        border: '1px solid #ccc'
      }}
    >
      <Box sx={{flexShrink: 0}}>
        <IoIosCalendar size="40px" />
      </Box>
      <Box ml={2}>
        <Heading as="h4">{title}</Heading>
        <Text as="p">{startdate}</Text>
      </Box>
    </Flex>
  );
};

export default UpcomingEvent;

UpcomingEvent.propTypes = {
  title: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired
};
