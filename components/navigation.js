/** @jsx jsx */
import {useState} from 'react';
import {jsx, Box, Flex, Button, Link as UILink, ThemeProvider} from 'theme-ui';
import Link from 'next/link';
import Logo from '../public/logo2.svg';
import Menu from './menu';
import * as Collapse from './collapse';

const Navigation = ({menuitems}) => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: '#3C5A72',
          background: '#3C5A72',
          text: '#fff'
        }
      }}
    >
      <Collapse.Manager>
        <Flex
          as="header"
          sx={{
            bg: 'primary',
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            alignItems: 'flex-end'
          }}
        >
          <Box pb={3} sx={{flex: '0 1 auto', height: '110px'}}>
            <Link passHref href="/" as="/">
              <UILink sx={{color: 'background'}}>
                <Logo sx={{height: '80px'}} />
              </UILink>
            </Link>
          </Box>
          <Box pb={3} sx={{flex: '1 0 100%', display: ['block', ' none']}}>
            <Collapse.Toggle>
              <Button
                type="button"
                sx={{
                  display: 'block',
                  margin: '0 auto',
                  border: '1px solid #c2b49a',
                  background: '#c2b49a',
                  color: 'text',
                  borderRadius: '0',
                  width: '100%',
                  maxWidth: '250px',
                  padding: '12px',
                  textTransform: 'uppercase'
                }}
              >
                Menu
              </Button>
            </Collapse.Toggle>
          </Box>
          <Box px={4} sx={{flex: ['1 0 100%', '0 1 auto']}}>
            <Collapse.Panel expanded={[false, true]}>
              <Menu items={menuitems} />
            </Collapse.Panel>
          </Box>
        </Flex>
      </Collapse.Manager>
    </ThemeProvider>
  );
};

export default Navigation;
