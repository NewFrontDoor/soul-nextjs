import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import '../style.css';

const App = ({Component, pageProps}) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default App;
