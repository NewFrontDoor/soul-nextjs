/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Box, Image, Styled, css, jsx} from 'theme-ui';

const action = css({
  textDecoration: 'none',
  padding: '10px 0',
  fontSize: '0.8em',
  textTransform: 'uppercase',
  border: '1px solid',
  borderColor: '#444446',
  borderRadius: '40px',
  gridColumnStart: 'NaN',
  color: '#444446',
  width: '7.25rem',
  ':hover': {backgroundColor: '#444446', color: 'white', cursor: 'pointer'},
  '@media (min-width: 420px)': {gridColumnStart: '2'}
});

type HeaderProps = {
  children: string;
};

const Header = ({children}: HeaderProps) => (
  <Styled.h3
    sx={{
      gridColumn: '1/1',
      maxWidth: '100%',
      textAlign: 'center',
      margin: '0.5em'
    }}
  >
    {children}
  </Styled.h3>
);

Header.propTypes = {
  children: PropTypes.node
};

type LinkProps = {
  url: string;
  children: string;
};

const InternalLink = ({url, children}: LinkProps) => {
  return (
    <Link passHref css={action} href={url}>
      <Styled.a>{children}</Styled.a>
    </Link>
  );
};

const ExternalLink = ({url, children}: LinkProps) => {
  return (
    <Styled.a css={action} href={url}>
      {children}
    </Styled.a>
  );
};

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

type CardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  action?: string;
};

const Card = ({title, description, image, link, action}: CardProps) => {
  return (
    <div>
      {regex.test(link) ? (
        <Link href={`/${link}`}>
          <Styled.a>
            <Image
              sx={{gridColumn: '1/1', width: '100%'}}
              src={image}
              alt={title}
            />
            <Header>{title}</Header>
          </Styled.a>
        </Link>
      ) : (
        <Styled.a href={link}>
          <Image
            sx={{gridColumn: '1/1', width: '100%'}}
            src={image}
            alt={title}
          />
          <Header>{title}</Header>
        </Styled.a>
      )}
      {description}
      {link && (
        <Box
          as="section"
          sx={{
            gridColumn: '1/1',
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'space-evenly',
            width: '50%',
            margin: 'auto',
            button: {
              background: 'none',
              textTransform: 'lowercase',
              fontSize: '0.8em',
              padding: '10px 15px 10px 15px'
            }
          }}
        >
          {regex.test(link) ? (
            <InternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </InternalLink>
          ) : (
            <ExternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </ExternalLink>
          )}
        </Box>
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
