import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { callAnalyticAction } from '../../actions/analytics';
import { modalHide, modalShow } from '../../actions/modal';

import App from '../../component/app';

export function mapStateToProps({ modal }) {
  return { modal };
}

export function mapDispatchToProps(dispatch) {
  return {
    callAnalyticAction: payload => dispatch(callAnalyticAction(payload)),
    modalHide: payload => dispatch(modalHide()),
    modalShow: payload => dispatch(modalShow(payload))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
