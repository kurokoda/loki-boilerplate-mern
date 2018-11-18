import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

/**
 * Generates dynamically populated `<meta>`, `<link>`, and/or `<title>` nodes in
 * the document `<head>` so that web crawlers are able to access the correct
 * metadata immediately on page load. This class is responsible for the topic page
 * metadata
 * @returns {xml} The TopicHelmet component
 */

const TopicHelmet = props => {
  const { topic } = props;
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.substr(1);
  const title = `${topicCapitalized} | The Tylt`;

  const meta = [
    {
      content: "website",
      property: "og:type"
    },
    {
      content: "https://d1t45yl3uropch.cloudfront.net/assets/logos/Tylt-Logo-BlackSquare-9fbf44183c5db8dfccf9c77ca1d11964976381742b1b6c9b41b7d0ab3ae247e4.jpg",
      property: "og:image"
    },
    {
      content: "https://d1t45yl3uropch.cloudfront.net/assets/logos/Tylt-Logo-BlackSquare-9fbf44183c5db8dfccf9c77ca1d11964976381742b1b6c9b41b7d0ab3ae247e4.jpg",
      property: "twitter:image"
    },
    {
      content: "summary",
      name: "twitter:card"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      property: "og:title",
      content: title
    },
    {
      content: "Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story.",
      name: "description"
    },
    {
      content: "Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story.",
      name: "og:description"
    },
    {
      content: "Vote on the topics that matter to you. We take the pulse of the internet and elevate our community’s perspectives, making them part of the story.",
      name: "twitter:description"
    },
    {
      property: "og:url",
      content: `https://thetylt.com/${topic.toLowerCase()}`
    }
  ];

  const link = [{ href: `https://thetylt.com/${topic.toLowerCase()}/`, rel: "canonical" }];

  return <Helmet title={title} meta={meta} link={link} />;
};

TopicHelmet.propTypes = {
  /** The application's active topic, i.e. culture, entertainment, politics,
   * sports
   */
  topic: PropTypes.string.isRequired
};

export default TopicHelmet;
