import React from 'react';
import Helmet from 'react-helmet';

/**
 * Generates dynamically populated `<meta>`, `<link>`, and/or `<title>` nodes in
 * the document `<head>` so that web crawlers are able to access the correct
 * metadata immediately on page load. This class is responsible for the common
 * metadata which applies to all pages in the app.
 */

const ApplicationHelmet = () => {
  /** Sets the title node */
  const title = 'Title';

  /** Sets the meta nodes */
  const meta = [
    { charset: 'utf-8' },
    {
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      name: 'viewport'
    },
    {
      content: '#000000',
      name: 'theme-color'
    },
    {
      content: 'IE=edge',
      httpEquiv: 'X-UA-Compatible'
    },
    {
      content: 'no',
      name: 'apple-mobile-web-app-capable'
    },
    {
      content: 'black-translucent',
      name: 'apple-mobile-web-app-status-bar-style'
    }
  ];

  /** Sets the link nodes */
  const link = [
    {
      crossorigin: 'anonymous',
      href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
      integrity:
        'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      href: '//fonts.googleapis.com/css?family=Roboto',
      rel: 'stylesheet',
      type: 'text/css'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Zilla+Slab',
      rel: 'stylesheet',
      type: 'text/css'
    }
  ];

  return <Helmet title={title} meta={meta} link={link} />;
};

ApplicationHelmet.propTypes = {};

export default ApplicationHelmet;
