/* eslint-disable react/prefer-stateless-function */

import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactModal from 'react-modal';
import { ApplicationContext } from '../../context/application';

ReactModal.setAppElement('#root');

/**
 * The application modal component
 */

class Modal extends Component {
  static contextType = ApplicationContext;

  /**
   * Controls updates and rendering
   * @returns {boolean} The evaluation to determine whether the component should
   * update when its props change
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { config } = this.props;
    const { theme } = this.context;
    const styles = Modal.getStyles({ theme });

    let ModalContent;

    if (config) {
      ModalContent = config.get('Content');
    }

    return (
      <Fragment>
        {config && (
          <ReactModal
            isOpen={Boolean(ModalContent)}
            contentLabel={config.get('contentLabel')}
            onAfterOpen={config.get('onAfterOpen')}
            onRequestClose={config.get('onRequestClose')}
            style={styles}
          >
            <ModalContent />
          </ReactModal>
        )}
      </Fragment>
    );
  }
}

Modal.propTypes = {
  config: ImmutablePropTypes.map
};

Modal.defaultProps = {
  config: null
};

Modal.getStyles = config => ({
  overlay: {
    backgroundColor: config.theme.getIn(['modal', 'color', 'overlay']),
    zIndex: '1000'
  },
  content: {
    color: '#999999',
    background: 'none',
    bottom: 'auto',
    border: 'none',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export default Modal;
