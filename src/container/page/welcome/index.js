import { connect } from 'react-redux';
import { WelcomePage } from '../../../component/page';

export function mapStateToProps({ user }) {
  return { user };
}

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
