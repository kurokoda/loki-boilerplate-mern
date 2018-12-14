import { connect } from 'react-redux';
import { WelcomePage } from '../../../component/page';

export function mapStateToProps({ localization, user }) {
  return { localization,  user };
}

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
