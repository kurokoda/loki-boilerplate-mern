// Imports

import Immutable from "immutable";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { PrimaryLayout, SecondaryLayout, WideLayout } from "./layout";

class VotingModule extends Component {
  state = {
    width: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    let count = 0;
    this.resizeInterval = setInterval(() => {
      if (count < 3) {
        this.setState({});
        count += 1;
      } else {
        clearInterval(this.resizeInterval);
      }
    }, 500);
    this.onResize();
  }

  componentWillUnmount() {
    clearInterval(this.resizeInterval);
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const { props, orientation } = this;
    const Layout = this.layoutElement;
    return (
      <div
        ref={element => {
          this.container = element;
        }}
      >
        <Layout {...props} orientation={orientation} />
      </div>
    );
  }

  // Business logic

  onResize = () => {
    this.container && this.setState({ width: this.container.clientWidth });
  };

  // Getters

  get orientation() {
    const { layout } = this.props;
    const { width } = this.state;

    switch (layout) {
      case "primary":
      case "secondary":
        return "portrait";
      case "wide":
        return width > 700 ? "landscape" : "portrait";
      default:
        return null;
    }
  }

  get layoutElement() {
    const { layout } = this.props;
    const { width } = this.state;

    switch (layout) {
      case "primary":
        return PrimaryLayout;
      case "secondary":
        return SecondaryLayout;
      case "wide":
        return width > 700 ? WideLayout : PrimaryLayout;
      default:
        return null;
    }
  }
}

// PropTypes

VotingModule.propTypes = {
  animated: PropTypes.bool,
  article: ImmutablePropTypes.map.isRequired,
  castVote: PropTypes.func.isRequired,
  onAnimationComplete: PropTypes.func,
  onClickAnalyticAction: PropTypes.func,
  index: PropTypes.number,
  layout: PropTypes.string.isRequired,
  sessionVotes: ImmutablePropTypes.map,
  vote: PropTypes.shape({}).isRequired,
  votes: ImmutablePropTypes.map.isRequired,
  socialShareAction: PropTypes.func,
  postVoteShareActionArticle: PropTypes.func,
  manualVoteActionArticle: PropTypes.func,
  postVoteShareActionCategory: PropTypes.func,
  manualVoteActionCategory: PropTypes.func
};

VotingModule.defaultProps = {
  animated: true,
  index: null,
  onAnimationComplete: () => {},
  sessionVotes: Immutable.fromJS({}),
  showTopic: false,
  onClickAnalyticAction: null,
  socialShareAction: null,
  postVoteShareActionArticle: null,
  manualVoteActionArticle: null,
  postVoteShareActionCategory: null,
  manualVoteActionCategory: null
};

// Exports

export default VotingModule;
