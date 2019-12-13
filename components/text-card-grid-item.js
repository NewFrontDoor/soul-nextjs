import React from 'react';
import {Styled} from 'theme-ui';
import PropTypes from 'prop-types';

export default function TextCard({header, description}) {
  return (
    <div>
      <Styled.h3>{header}</Styled.h3>
      {description}
    </div>
  );
}

TextCard.propTypes = {
  description: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired
};
