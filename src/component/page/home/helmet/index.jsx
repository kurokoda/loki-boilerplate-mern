import React from "react";
import Helmet from "react-helmet";

/**
 * Generates dynamically populated `<meta>`, `<link>`, and/or `<title>` nodes in
 * the document `<head>` so that web crawlers are able to access the correct
 * metadata immediately on page load. This class is responsible for the home page
 * metadata
 * @returns {xml} The HomeHelmet component
 */
const HomeHelmet = () => (
  <Helmet>
    <title>The Tylt | Hash it out</title>
    <meta
      content="https://d1t45yl3uropch.cloudfront.net/assets/logos/Tylt-Logo-BlackSquare-9fbf44183c5db8dfccf9c77ca1d11964976381742b1b6c9b41b7d0ab3ae247e4.jpg"
      property="og:image"
    />
    <meta content="https://thetylt.com" property="og:url" />
    <meta content="summary" name="twitter:card" />
    <meta content="The Tylt | Hash it out" name="twitter:title" />
    <meta content="The Tylt | Hash it out" property="og:title" />
    <meta
      content="Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story."
      name="description"
    />
    <meta
      content="Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story."
      property="og:description"
    />
    <meta
      content="Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story."
      name="twitter:description"
    />
    <meta
      content="https://d1t45yl3uropch.cloudfront.net/assets/logos/Tylt-Logo-BlackSquare-9fbf44183c5db8dfccf9c77ca1d11964976381742b1b6c9b41b7d0ab3ae247e4.jpg"
      name="twitter:image"
    />
    <link href="https://thetylt.com/" rel="canonical" />
    <meta content="website" property="og:type" />
  </Helmet>
);

export default HomeHelmet;
