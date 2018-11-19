import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import style from '../../../config/style';

const WrapperBasic = ({ children, onClose, title }) => {
  const classes = WrapperBasic.getClasses();

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
};

export default WrapperBasic;

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

WrapperBasic.getStyles = () =>
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
      color: style.about.color.headerText,
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    wrapperContainer: {
      background: style.modal.color.background,
      boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.2)',
      padding: '20px 20px 20px 20px',
      minHeight: '340px',
      minWidth: '340px',
      outline: '1px solid #DDDDDD'
    }
  });
