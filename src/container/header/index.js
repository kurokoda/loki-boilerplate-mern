import { connect } from 'react-redux';
import { signIn, signOut, signUp } from '../../actions/user';
import Header from '../../component/header';
import { modalHide, modalShow } from '../../actions/modal';
import { fetchPageData } from '../../actions/page';

export function mapStateToProps({ user }) {
  return { user };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPageData: (type, onSuccess, onError) =>
      dispatch(fetchPageData(type, onSuccess, onError)),
    modalHide: payload => dispatch(modalHide()),
    modalShow: payload => dispatch(modalShow(payload)),
    signIn: (props, onSuccess, onError) =>
      dispatch(signIn(props, onSuccess, onError)),
    signOut: () => dispatch(signOut()),
    signUp: (props, onSuccess, onError) =>
      dispatch(signUp(props, onSuccess, onError))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
