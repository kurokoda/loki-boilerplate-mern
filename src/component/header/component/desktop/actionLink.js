import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import PropTypes from 'prop-types';
import style from '../../../../config/style';

const ActionLink = ({ children, callback }) => {
  const classes = ActionLink.getClasses();
  return (
    <div
      className={classes.page}
    >
      <span
        className={classes.link}
        onClick={callback}
        onKeyDown={callback}
        tabIndex={0}
        role="link"
      >
         {children}
      </span>
    </div>
  );
};

export default ActionLink;

ActionLink.propTypes = {
  children: PropTypes.node.isRequired
};

ActionLink.getClasses = config => {
  const styles = ActionLink.getStyles(config);

  return {
    link: css(styles.link),
    page: css(styles.page)
  };
};

ActionLink.getStyles = () =>
    StyleSheet.create({
      link: {
        color: style.header.color.actionLink,
        cursor: 'pointer',
        fontFamily: 'Open Sans',
        margin: '22px 0 0 0',
        outline: 'none',
        padding: '14px 5px 5px 5px',
        textDecoration: 'none !important'
      },
      page: {
        color: '#000000,',
        display: 'inline-block',
        fontWeight: '400',
        margin: '0 20px 0 0',

        '@media (max-width: 768px)': {
          margin: '0 5px 0 0'
        }
      }
    });
