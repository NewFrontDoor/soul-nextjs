import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Wrapper = styled.section`
  padding: 40px 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: ${props =>
      props.width === 'wide'
        ? '1170px'
        : props.width === 'medium'
        ? '970px'
        : '750px'};
  }
  ${props => props.styles}
`;

export default function ContentWrapper({children, width, styles}) {
  return (
    <Wrapper width={width} styles={styles}>
      {children}
    </Wrapper>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.any,
  styles: PropTypes.any,
  width: PropTypes.any
};
