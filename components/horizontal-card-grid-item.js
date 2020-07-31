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

const HorizontalCard = ({title, description, image, link}) => {
  return (
    <Wrapper>
      {!link ? (
        <img src={image} alt={title} />
      ) : regex.test(link) ? (
        <Link href={`/${link}`}>
          <a>
            <img src={image} alt={title} />
          </a>
        </Link>
      ) : (
        <a href={link}>
          <img src={image} alt={title} />
        </a>
      )}
      <div>
        <Styled.h3>{title}</Styled.h3>
        {description}
      </div>
    </Wrapper>
  );
};

export default HorizontalCard;

HorizontalCard.propTypes = {
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string
};
