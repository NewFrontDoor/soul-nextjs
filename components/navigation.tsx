/** @jsx jsx */
import {useRef} from 'react';
import {jsx, Box, Flex, Button, Link as UILink, ThemeProvider} from 'theme-ui';
import Link from 'next/link';
import {useResponsiveValue} from '@theme-ui/match-media';
import {useCollapse} from '@newfrontdoor/collapse';
import Logo from '../public/logo2.svg';
import Menu, {MenuProps} from './menu';

export type NavigationProps = {
  menuitems: MenuProps['items'];
};

const Navigation = ({menuitems}: NavigationProps) => {
  const contentRef = useRef(null);
  const isDisabled = useResponsiveValue([false, true]);
  const {getToggleProps, getCollapseProps} = useCollapse({
    contentRef,
    isDisabled
  });

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
        <Box py={3} sx={{flex: '0 1 auto', height: '110px'}}>
          <Link passHref href="/">
            <UILink sx={{color: 'background'}}>
              <Logo sx={{height: '80px'}} />
            </UILink>
          </Link>
        </Box>
        <Box pb={3} sx={{flex: '1 0 100%', display: ['block', ' none']}}>
          <Button
            {...getToggleProps()}
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
        </Box>
        <Box
          px={4}
          sx={{flex: ['1 0 100%', '0 1 auto']}}
          {...getCollapseProps()}
        >
          <Box ref={contentRef}>
            <Menu items={menuitems} />
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default Navigation;
