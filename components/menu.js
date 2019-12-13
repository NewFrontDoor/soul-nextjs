/** @jsx jsx */
import React, {useState} from 'react';
import {jsx} from 'theme-ui';
import styled from '@emotion/styled';
import Link from 'next/link';
import {Text} from '@theme-ui/components';

const List = styled('ul')`
  margin: 0;
  margin-left: 100px;
  list-style: none;
  display: ${props => props.isVisible};
  @media (min-width: 770px) {
    display: flex;
  }
  li {
    padding-right: 30px;
    align-self: center;
  }
`;

const ListItem = styled('li')`
  position: relative;
  line-height: 1.6;
  transition-duration: 0.5s;
  &:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
  }
  a {
    text-decoration: none;
  }
  color: #444446;
  @media screen and (min-width: 768px) {
    color: white;
    padding-bottom: 1rem;
    margin-bottom: -1rem;
    line-height: initial;
  }
`;

const Submenu = styled('ul')`
  list-style: none;
  margin: 0;
  padding-left: 0;
  visibility: hidden;
  opacity: 0;
  min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
  left: 0;
  display: none;
  color: #444446;
  padding: 0.75em 0.5em 0.75em 0.625em;
  border-radius: 0.3125em;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;

export default function Menu({items, isVisible}) {
  const [openMenu, updateOpenMenu] = useState(null);
  return (
    <List isVisible={isVisible ? 'block' : 'none'}>
      {items.map(item => {
        if (!item.childpages) {
          return null;
        }

        return item.childpages.length <= 1 ? (
          <ListItem key={item.subtext}>
            <Link passHref href={`/${item.childpages[0].slug.current}`}>
              <a sx={{variant: 'links.nav'}}>
                <Text variant="menu">{item.title}</Text>
                <Text variant="subtext">{item.subtext}</Text>
              </a>
            </Link>
          </ListItem>
        ) : (
          <ListItem key={item.subtext}>
            <Link passHref href={'/' + item.childpages[0].slug.current}>
              <a sx={{variant: 'links.nav'}}>
                <Text variant="menu">{item.title}</Text>
                <Text variant="subtext">{item.subtext}</Text>
              </a>
            </Link>
            <Submenu>
              {item.childpages.map(child => {
                return (
                  <li
                    key={child.slug.current + child.title}
                    sx={{paddingBottom: '0.5rem'}}
                  >
                    <Link href={child.slug.current}>
                      <a>{child.title}</a>
                    </Link>
                  </li>
                );
              })}
            </Submenu>
          </ListItem>
        );
      })}
    </List>
  );
}
