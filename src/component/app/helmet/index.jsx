import React from "react";
import Helmet from "react-helmet";

/**
 * Generates dynamically populated `<meta>`, `<link>`, and/or `<title>` nodes in
 * the document `<head>` so that web crawlers are able to access the correct
 * metadata immediately on page load. This class is responsible for the common
 * metadata which applies to all pages in the app.
 */

const ApplicationHelmet = () => {
  /** Sets the title node */
  const title = "The Tylt";

  /** Sets the meta nodes */
  const meta = [
    { charset: "utf-8" },
    {
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      name: "viewport"
    },
    {
      content: "#000000",
      name: "theme-color"
    },
    {
      content: "IE=edge",
      httpEquiv: "X-UA-Compatible"
    },
    {
      content: "no",
      name: "apple-mobile-web-app-capable"
    },
    {
      content: "black-translucent",
      name: "apple-mobile-web-app-status-bar-style"
    },
    {
      content: "The Tylt",
      name: "author"
    },
    {
      content: "The Tylt",
      name: "apple-mobile-web-app-title"
    },
    {
      content: "The Tylt",
      name: "application-name"
    },
    {
      content: "#000000",
      name: "msapplication-TileColor"
    },
    {
      content: "/mstile-144x144.png",
      name: "msapplication-TileImage"
    },
    {
      content: "#ffffff",
      name: "theme-color"
    },
    {
      content: "@TheTylt",
      name: "twitter:site"
    },
    {
      content: "The Tylt",
      name: "og:site_name"
    },
    {
      content: "438567086329236",
      property: "fb:app_id"
    },
    {
      content: "1023698444330392",
      property: "fb:pages"
    },
    {
      content: "authenticity_token",
      name: "csrf-param"
    },
    {
      name: "p:domain_verify",
      content: "016e8e38a1f8ad341253e39bc284971c"
    },
    {
      content:
        "adF67ipIEAui+5SoVwjH7nYT2nnthdf0sfkC+38F7sD2/Ri8N3hR61WOOyyCdZPOqiP65ky6OHTpHDrmLhHdGg=: ",
      name: "csrf-token"
    }
  ];

  /** Sets the link nodes */
  const link = [
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css",
      integrity:
        "sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ",
      crossorigin: "anonymous"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "//fonts.googleapis.com/css?family=Roboto"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://fonts.googleapis.com/css?family=Zilla+Slab"
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: "https://thetylt.com/feed.rss"
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: "https://thetylt.com/feed.atom"
    }
  ];

  return <Helmet title={title} meta={meta} link={link} />;
};

ApplicationHelmet.propTypes = {};

export default ApplicationHelmet;
