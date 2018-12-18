import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import Image from '../../assets/images/subheader/tiger.jpg';

/**
 * The application Subheader component. Contains page links.
 * @return {XML} A Subheader component
 */
const Subheader = () => {
  const classes = Subheader.getClasses();

  return (
    <div className={classes.imageContainer}>
      <img alt="A psychedelic tiger" className={classes.image} src={Image} />
    </div>
  );
};

export default Subheader;

Subheader.propTypes = {};

Subheader.defaultProps = {};

Subheader.getClasses = () => {
  const styles = Subheader.getStyles();

  return {
    image: css(styles.image),
    imageContainer: css(styles.imageContainer)
  };
};

Subheader.getStyles = () =>
  StyleSheet.create({
    image: {
      width: '100%'
    },
    imageContainer: {
      margin: '0 0 40px 0'
    }
  });
