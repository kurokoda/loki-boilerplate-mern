/* eslint-disable react/prefer-stateless-function */

import React, { Component, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ReactModal from 'react-modal';
import style from '../../config/style';

ReactModal.setAppElement('#root');

/**
 * The application modal component
 */

class Modal extends Component {
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
            style={customStyles}
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

const customStyles = {
  overlay: {
    backgroundColor: style.modal.color.overlay,
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
};

export default Modal;
