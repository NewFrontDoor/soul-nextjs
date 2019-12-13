import React from 'react';
import styled from '@emotion/styled';
import {Styled} from 'theme-ui';
import PropTypes from 'prop-types';

const Header = styled(Styled.h5)`
  grid-column: 1/1;
  grid-row: 1/1;
  text-align: left;
  margin: 10px;
  z-index: 20;
  color: white;
  align-self: end;
`;

const Image = styled.img`
  grid-row: 1/1;
  grid-column: 1/1;
  width: 100%;
`;

const ShadedOverlay = styled.div`
  grid-row: 1/1;
  grid-column: 1/1;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 19;
`;

const Wrapper = styled.a`
  display: contents;
  text-decoration: none;
`;

export default function Overlay({header, image, link}) {
  return (
    <Wrapper href={link}>
      <Image src={image} alt={header} />
      <ShadedOverlay />
      <Header>{header}</Header>
    </Wrapper>
  );
}

Overlay.propTypes = {
  header: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
