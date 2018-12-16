import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { ApplicationContext } from '../../../context/application';

class WrapperBasic extends Component {
  static contextType = ApplicationContext;

  render() {
    const { children, onClose, title } = this.props;
    const { theme } = this.context;

    const classes = WrapperBasic.getClasses({ theme });

    return (
      <div className={classes.wrapperContainer}>
        {onClose && (
          <div className={classes.buttonContainer}>
            <button
              className={`btn btn-danger btn-xs ${classes.button}`}
              onClick={onClose}
              onKeyDown={onClose}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        )}
        {title && <h3 className={classes.title}>{title}</h3>}
        <div className={classes.childContainer}>{children}</div>
      </div>
    );
  }
}

export default WrapperBasic;

WrapperBasic.contextType = ApplicationContext;

WrapperBasic.getClasses = config => {
  const styles = WrapperBasic.getStyles(config);

  return {
    button: css(styles.button),
    buttonContainer: css(styles.buttonContainer),
    childContainer: css(styles.childContainer),
    title: css(styles.title),
    wrapperContainer: css(styles.wrapperContainer)
  };
};

WrapperBasic.getStyles = config =>
  StyleSheet.create({
    button: {
      float: 'right'
    },
    buttonContainer: {
      overflow: 'auto'
    },
    childContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '180px'
    },
    title: {
      color: config.theme.getIn(['app', 'color', 'headerText']),
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    wrapperContainer: {
      background: config.theme.getIn(['modal', 'color', 'background']),
      boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.2)',
      padding: '20px 20px 20px 20px',
      minHeight: '340px',
      minWidth: '340px',
      outline: '1px solid #DDDDDD'
    }
  });
