import { css, StyleSheet } from "aphrodite";
import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { getIncrementedElementName } from "../../../../utils/collection";
import Hashtag from "./hashtag";

class SupportingMedia extends PureComponent {
  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change. SupportingMedia does NOT update, as this causes
   * iFramely to 'flicker'
   */
  shouldComponentUpdate = () => false;

  render() {
    const { article } = this.props;
    return (
      <Fragment>
        <SupportingMediaElements article={article} />
      </Fragment>
    );
  }
}

const SupportingMediaElements = props => {
  const { article } = props;
  const classes = SupportingMedia.getClasses();
  const supportingMedia = article
    .get("supportingMedia")
    .sortBy(m => parseInt(m.get("position"), 10))
    .valueSeq();
  return (
    <Fragment>
      {supportingMedia.map((media, index) => {
        let content;
        const faction = media.get("faction");
        const hashtag = article.getIn(["voting", faction, "hashtag"]);
        const doShowHashtag = media.get("faction") !== "none";
        if (media.get("imageId")) {
          content = <ImageMedia media={media} />;
        } else if (media.get("embedHTML")) {
          const html = filterEmbedHtml(media.get("embedHTML"));
          content = <EmbedMedia html={html} />;
        } else if (media.get("iframelyHTML")) {
          content = <IFramelyMedia media={media} />;
        } else if (media.get("originalURL")) {
          content = <LinkMedia media={media} />;
        }

        return (
          <div
            key={getIncrementedElementName("supportingMediaElement")}
            className={classes.supportingMedia}
          >
            {doShowHashtag && <Hashtag hashtag={hashtag} faction={faction} />}
            {media.get("caption") && <Caption media={media} />}
            {content}
          </div>
        );
      })}
    </Fragment>
  );
};

SupportingMediaElements.propTypes = {
  article: ImmutablePropTypes.map.isRequired
};

const filterEmbedHtml = html => {
  /*
   * This method handles the case where our Cincopa slideshow component
   * does not render on navigation to the article page.
   *
   * JSX  has a problem rendering dynamic <script> tags,
   * so we use regex to extract the injected Cincopa script and run it using
   * eval() on the window's scope.
   */
  const CINCOPA_SCRIPT_ELEMENT = /<script([\s\S]+)www\.cincopa\.com([\s\S]+)<\/script>/gm;
  const CINCOPA_SCRIPT = /var\scpo([\s\S]+)}\)\(\);/gm;
  const cincopaScriptElement = html.match(CINCOPA_SCRIPT_ELEMENT);
  const cincopaScript = html.match(CINCOPA_SCRIPT);

  if (cincopaScriptElement) {
    html.replace(cincopaScriptElement, "");
    window.eval(cincopaScript[0]); // eslint-disable-line
  }
  return html;
};

const ImageMedia = props => {
  const classes = SupportingMedia.getClasses();

  return (
    <div key={getIncrementedElementName("imageMedia")}>
      <img
        alt="imageSupportingMedia"
        className={classes.imageId}
        src={props.media.get("imageURL")}
      />
    </div>
  );
};

ImageMedia.propTypes = {
  media: PropTypes.string.isRequired
};

const IFramelyMedia = props => (
  <div
    key={getIncrementedElementName("iFramelyMedia")}
    dangerouslySetInnerHTML={{
      __html: props.media.get("iframelyHTML")
    }} // eslint-disable-line react/no-danger
  />
);

IFramelyMedia.propTypes = {
  media: ImmutablePropTypes.map.isRequired
};

const LinkMedia = props => (
  <div key={getIncrementedElementName("linkMedia")}>
    <a href={props.media.get("originalURL")} data-iframely-url>
      {props.media.get("originalURL")}
    </a>
  </div>
);

LinkMedia.propTypes = {
  media: ImmutablePropTypes.map.isRequired
};

const EmbedMedia = props => (
  <div
    key={getIncrementedElementName("embedMedia")}
    dangerouslySetInnerHTML={{ __html: props.html }} // eslint-disable-line react/no-danger
  />
);

EmbedMedia.propTypes = {
  html: PropTypes.string.isRequired
};

const Caption = props => (
  <div
    name="caption"
    dangerouslySetInnerHTML={{
      __html: props.media.get("caption")
    }} // eslint-disable-line react/no-danger
  />
);

Caption.propTypes = {
  media: ImmutablePropTypes.map.isRequired
};

SupportingMedia.getClasses = () => {
  const styles = SupportingMedia.getStyles();

  return {
    caption: css(styles.caption),
    imageId: css(styles.imageId),
    supportingMedia: css(styles.supportingMedia)
  };
};

SupportingMedia.propTypes = {
  article: ImmutablePropTypes.map.isRequired
};

SupportingMedia.getStyles = () =>
  StyleSheet.create({
    caption: {
      fontSize: "18px"
    },
    imageId: {
      width: "100%"
    },
    supportingMedia: {
      fontFamily: "Zilla Slab",
      fontSize: "18px",
      lineHeight: "30px",
      margin: "0 0 21px 0"
    }
  });

export default SupportingMedia;
