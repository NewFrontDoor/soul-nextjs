/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import styled from '@emotion/styled';
import Link from 'next/link';
import {Styled, jsx} from 'theme-ui';
import PropTypes from 'prop-types';

const Actions = styled('section')`
  grid-column: 1/1;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  button {
    background: none;
    text-transform: lowercase;
    font-size: 0.8em;
    padding: 10px 15px 10px 15px;
  }
`;

const action = (props) => css`
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  border-color: #444446;
  border-radius: 40px;
  grid-column-start: NaN;
  color: #444446;
  width: 7.25rem;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 420px) {
    grid-column-start: ${props.column + 2};
  }
`;

const Header = styled(Styled.h3)`
  grid-column: 1/1;
  max-width: 100%;
  text-align: center;
  margin: 0.5em;
`;

let InternalLink = ({url, children}) => {
  return (
    <Link passHref css={action} href={`/${url}`}>
      <Styled.a>{children}</Styled.a>
    </Link>
  );
};

let ExternalLink = ({url, children}) => {
  return (
    <Styled.a css={action} href={`${url}`}>
      {children}
    </Styled.a>
  );
};

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

let Card = ({title, description, image, link, action}) => {
  return (
    <div>
      {regex.test(link) ? (
        <Link href={`/${link}`}>
          <Styled.a>
            <img
              sx={{gridColumn: '1/1', width: '100%'}}
              src={image}
              alt={title}
            />
            <Header>{title}</Header>
          </Styled.a>
        </Link>
      ) : (
        <Styled.a href={link}>
          <img
            sx={{gridColumn: '1/1', width: '100%'}}
            src={image}
            alt={title}
          />
          <Header>{title}</Header>
        </Styled.a>
      )}
      {description}
      {link && (
        <Actions>
          {regex.test(link) ? (
            <InternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </InternalLink>
          ) : (
            <ExternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </ExternalLink>
          )}
        </Actions>
      )}
    </div>
  );
};

export default Card;

Card.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

InternalLink.propTypes = {
  children: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

ExternalLink.propTypes = {
  children: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};
