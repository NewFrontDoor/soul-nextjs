/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import Link from 'next/link';
import {Text, Link as UILink} from '@theme-ui/components';

export type MenuProps = {
  items: Array<{
    childpages?: Array<{
      slug: {
        current: string;
      };
      title: string;
    }>;
    current: string;
    subtext: string;
    title: string;
  }>;
};

const Menu = ({items}: MenuProps) => {
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
        console.log(item.childpages);
        if (!item.childpages) {
          return null;
        }

        return (
          <Styled.li
            key={item.subtext}
            sx={{
              position: 'relative',
              lineHeight: '1.6',
              px: [0, 4],
              alignSelf: 'center',
              color: '#444446',
              '&:hover > ul, &:focus-within > ul': {
                visibility: 'visible',
                opacity: '1',
                display: 'block'
              }
            }}
          >
            <Link passHref href={`/${item.childpages[0].slug.current}`}>
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
              <Styled.ul
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
              >
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
                    <Link passHref href={`/${child.slug.current}`}>
                      <UILink variant="subnav">{child.title}</UILink>
                    </Link>
                  </Styled.li>
                ))}
              </Styled.ul>
            )}
          </Styled.li>
        );
      })}
    </Styled.ul>
  );
};

export default Menu;
