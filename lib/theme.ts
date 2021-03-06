// Example theme.js
const theme = {
  text: {
    default: {
      color: 'text',
      fontFamily: 'body'
    },
    menu: {
      color: 'text',
      fontFamily: 'heading',
      textTransform: 'lowercase',
      textDecoration: 'none',
      fontSize: 30,
      cursor: 'pointer'
    },
    subtext: {
      color: 'accent',
      fontFamily: 'body',
      textTransform: 'lowercase',
      textDecoration: 'none',
      fontSize: 16,
      cursor: 'pointer'
    }
  },
  fonts: {
    body: 'Helvetica, system-ui, sans-serif',
    heading: '"Eurostile", serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em'
  },
  colors: {
    background: '#FFF',
    text: '#2B2B2B',
    primary: '#3C5A72',
    accent: '#CF9901',
    light: '#707070',
    link: 'accent',
    banner: '#F1F1F1',
    footerBg: 'text',
    none: 'none'
  },
  links: {
    nav: {
      display: 'inline-block',
      fontFamily: 'heading',
      fontWeight: 400,
      py: 3,
      color: 'background',
      textTransform: 'lowercase',
      textDecoration: 'none'
    },
    subnav: {
      fontFamily: 'body',
      fontWeight: 400,
      color: ['text', 'primary'],
      textTransform: 'capitalize',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    footer: {
      fontFamily: 'body',
      fontWeight: 'body',
      color: 'background',
      textDecoration: 'none',
      '&:visited': {
        color: 'background'
      },
      '&:hover': {
        color: 'accent'
      },
      '&:active': {
        color: 'accent'
      }
    }
  },
  styles: {
    h1: {
      fontSize: 48,
      fontFamily: 'heading',
      fontWeight: 'heading',
      color: 'primary',
      mt: 4,
      mb: 2
    },
    h2: {
      fontSize: 36,
      fontFamily: 'heading',
      color: 'primary',
      fontWeight: 'body'
    },
    h3: {
      color: 'text',
      fontSize: 24,
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontStyle: 'normal',
      mt: 4,
      mb: 2
    },
    h4: {
      color: 'text',
      fontSize: 20,
      fontFamily: 'body',
      fontWeight: 'heading',
      fontStyle: 'normal',
      mt: 4,
      mb: 2
    },
    h5: {
      fontSize: 18,
      fontFamily: 'body',
      fontWeight: 'heading',
      color: 'light',
      mt: 0,
      mb: 2
    },
    p: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'accent',
      fontFamily: 'body',
      fontStyle: 'normal',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:visited': {
        color: 'text'
      },
      '&:hover': {
        color: 'text'
      },
      '&:active': {
        color: 'text'
      }
    },
    ul: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  },
  buttons: {
    home: {
      fontFamily: 'body',
      borderRadius: '3px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'background',
      fontSize: 16,
      padding: '20px 40px',
      minWidth: '250px',
      cursor: 'pointer',
      color: 'background',
      bg: 'none',
      '&:hover': {
        bg: 'background',
        color: 'text'
      }
    }
  },
  box: {
    banner: {
      mx: 'auto',
      bg: 'banner',
      color: 'accent'
    },
    body: {
      mx: 'auto',
      bg: 'background',
      color: 'text'
    }
  },
  forms: {
    label: {
      display: 'block',
      gridColumn: '1 / 2',
      paddingBottom: '5px'
    }
  },
  sizes: {
    container: '60vw'
  }
};

export default theme;
