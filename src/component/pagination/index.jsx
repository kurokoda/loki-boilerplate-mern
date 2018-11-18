import { css, StyleSheet } from "aphrodite";
import { times } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { getIncrementedElementName } from "../../utils/collection";
import { PaginationButton } from "../button";

class Pagination extends Component {
  constructor(props) {
    super(props);

    const { buttonCount, page } = props;

    this.state = {
      buttons: times(buttonCount, String),
      delta: Math.ceil(page / buttonCount),
      activeIndex: page
    };
  }

  componentDidUpdate() {
    const { buttonCount } = this.props;
    if (buttonCount !== this.state.buttons.length) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        buttons: times(buttonCount, String),
        delta: Math.ceil(this.state.activeIndex / buttonCount)
      });
    }
  }

  onSkipButtonClick = value => {
    const currentDelta = this.state.delta;
    const newDelta = currentDelta + value;
    if (value < 0 && currentDelta > 1) {
      this.setState({ delta: newDelta });
    } else if (value > 0 && currentDelta < this.maxDelta) {
      this.setState({ delta: newDelta });
    }
  };

  onPageButtonClick = pageNumber => {
    this.setState({ activeIndex: pageNumber });
    this.props.onButtonClick(pageNumber);
  };

  getPageNumber(position) {
    return (
      position +
      (this.state.buttons.length * this.state.delta - this.state.buttons.length)
    );
  }

  isNextDisabled() {
    return this.state.delta === this.maxDelta;
  }

  isPrevDisabled() {
    return this.state.delta === 1;
  }

  render() {
    const { itemsTotal, displayCount, buttonCount } = this.props;
    const styles = Pagination.getStyles();
    this.pageCount = Math.ceil(itemsTotal / displayCount);
    this.maxDelta = Math.ceil(this.pageCount / buttonCount);

    return (
      <div name="buttonContainer" className={css(styles.buttonContainer)}>
        <PaginationButton
          disabled={this.isPrevDisabled()}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            !this.isPrevDisabled() && this.onSkipButtonClick(-1);
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </PaginationButton>
        {this.state.buttons.map((count, index) => {
          const position = index + 1;
          const pageNumber = this.getPageNumber(position);
          return pageNumber <= this.pageCount ? (
            <PaginationButton
              active={this.state.activeIndex === pageNumber}
              key={getIncrementedElementName("paginationButton")}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                this.onPageButtonClick(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationButton>
          ) : null;
        })}
        <PaginationButton
          disabled={this.isNextDisabled()}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            !this.isNextDisabled() && this.onSkipButtonClick(1);
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </PaginationButton>
      </div>
    );
  }
}

Pagination.getStyles = () =>
  StyleSheet.create({
    buttonContainer: {
      display: "block",
      textAlign: "center"
    }
  });

Pagination.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  buttonCount: PropTypes.number.isRequired,
  itemsTotal: PropTypes.number.isRequired,
  displayCount: PropTypes.number.isRequired
};

Pagination.defaultProps = {};

export default Pagination;
