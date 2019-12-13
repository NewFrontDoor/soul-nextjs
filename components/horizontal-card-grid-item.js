import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import {Styled} from 'theme-ui';
import PropTypes from 'prop-types';

const Wrapper = styled('section')`
  display: grid;
  @media (min-width: 420px) {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }
`;

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function HorizontalCard({header, description, image, link}) {
  return (
    <Wrapper>
      {!link ? (
        <img src={image} alt={header} />
      ) : regex.test(link) ? (
        <Link href={`/${link}`}>
          <a>
            <img src={image} alt={header} />
          </a>
        </Link>
      ) : (
        <a href={link}>
          <img src={image} alt={header} />
        </a>
      )}
      <div>
        <Styled.h3>{header}</Styled.h3>
        {description}
      </div>
    </Wrapper>
  );
}

HorizontalCard.propTypes = {
  description: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string
};
