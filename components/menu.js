/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import Link from 'next/link';
import {Text, Link as UILink} from '@theme-ui/components';

const hoverVisible = {
  visibility: 'visible',
  opacity: '1',
  display: 'block'
};

const ListItem = (props) => (
  <Styled.li
    {...props}
    sx={{
      position: 'relative',
      lineHeight: '1.6',
      px: [0, 4],
      alignSelf: 'center',
      color: '#444446',
      '&:hover > ul': hoverVisible,
      '&:focus-within > ul': hoverVisible,
      '&:li ul:hover': hoverVisible
    }}
  />
);

const Submenu = (props) => (
  <Styled.ul
    {...props}
    sx={{
      zIndex: 1,
      listStyle: 'none',
      visibility: ['visible', 'hidden'],
      opacity: ['1', '0'],
      minWidth: '10rem',
      position: ['unset', 'absolute'],
      transition: 'opacity 0.5s ease',
      left: '0',
      display: ['block', 'none'],
      padding: '0.75em 0',
      borderRadius: '0.3125em',
      backgroundColor: ['unset', 'white'],
      boxShadow: ['none', '0 2px 12px rgba(0, 0, 0, 0.15)']
    }}
  />
);

const Menu = ({items}) => {
  return (
    <Styled.ul
      sx={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: ['block', 'flex'],
        flexWrap: ['no-wrap', 'wrap']
      }}
    >
      {items.map((item) => {
        if (!item.childpages) {
          return null;
        }

        return (
          <ListItem key={item.subtext}>
            <Link
              passHref
              href="/[slug]"
              as={`/${item.childpages[0].slug.current}`}
            >
              <UILink variant="nav">
                <Text as="p" variant="menu">
                  {item.title}
                </Text>
                <Text as="p" variant="subtext">
                  {item.subtext}
                </Text>
              </UILink>
            </Link>
            {item.childpages.length > 1 && (
              <Submenu>
                {item.childpages.map((child) => (
                  <Styled.li
                    key={child.slug.current + child.title}
                    sx={{
                      padding: '0.25rem 0.75em',
                      '&:focus-within': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Link passHref href="[slug]" as={`/${child.slug.current}`}>
                      <UILink variant="subnav">{child.title}</UILink>
                    </Link>
                  </Styled.li>
                ))}
              </Submenu>
            )}
          </ListItem>
        );
      })}
    </Styled.ul>
  );
};

export default Menu;
