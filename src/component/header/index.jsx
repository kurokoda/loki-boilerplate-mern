import { css, StyleSheet } from 'aphrodite';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import CollapsedLinks from './layout/collapsedLinks';
import ExpandedLinks from './layout/expandedLinks';

/**
 * The application header component. Contains page links.
 * @return {XML} A header component
 */
class Header extends Component {

  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      // This is necessary to update the display of the correct link's activeState
      this.forceUpdate();
    });
  }

  render() {
    const { theme } = this.context;
    const classes = Header.getClasses({ theme });
    return (
      <Fragment>
        <div className={classes.expandedLinks}>
          <ExpandedLinks {...this.props} />
        </div>
        <div className={classes.collapsedLinks}>
          <CollapsedLinks {...this.props} />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Header);

Header.propTypes = {};

Header.defaultProps = {};

Header.getClasses = config => {
  const styles = Header.getStyles(config);

  return {
    collapsedLinks: css(styles.collapsedLinks),
    expandedLinks: css(styles.expandedLinks)
  };
};

Header.getStyles = config =>
  StyleSheet.create({
    expandedLinks: {
      display: 'block',

      '@media (max-width: 769px)': {
        display: 'none'
      }
    },
    collapsedLinks: {
      display: 'none',

      '@media (max-width: 769px)': {
        display: 'block'
      }
    }
  });
