import React from "react";
import Helmet from "react-helmet";
import ImmutablePropTypes from "react-immutable-proptypes";

/**
 * Generates dynamically populated `<meta>`, `<link>`, and/or `<title>` nodes in
 * the document `<head>` so that web crawlers are able to access the correct
 * metadata immediately on page load. This class is responsible for the article page
 * metadata
 * @param {object} props The component's properties
 * @returns {xml} The ArticleHelmet component
 */
const ArticleHelmet = props => {
  const { pageData, path } = props;

  const title = `${pageData.getIn(["article", "title"])} | The Tylt`;

  const meta = [
    {
      content: pageData.get("meta").get("description"),
      name: "description"
    },
    {
      content: "summary_large_image",
      name: "twitter:card"
    },
    {
      content: pageData.getIn(["meta", "twitterDescription"]),
      name: "twitter:description"
    },
    {
      content: title,
      name: "twitter:title"
    },
    {
      content: pageData.getIn(["meta", "twitterImage"]),
      name: "twitter:image"
    },
    {
      content: pageData.getIn(["meta", "ogDescription"]),
      property: "og:description"
    },
    {
      content: pageData.getIn(["meta", "ogImage"]),
      property: "og:image"
    },
    {
      content: title,
      property: "og:title"
    },
    {
      content: `https://thetylt.com${path}`,
      property: "og:url"
    },
    {
      content: "article",
      property: "og:type"
    }
  ];

  const link = [
    {
      href: `https://thetylt.com${path}`,
      rel: "canonical"
    }
  ];

  return <Helmet title={title} meta={meta} link={link} />;
};

ArticleHelmet.propTypes = {
  /** The article page data */
  pageData: ImmutablePropTypes.map.isRequired
};

export default ArticleHelmet;
