import { connect } from "react-redux";
import { withRouter } from "react-router";
import App from "../../component/app";
import { pageView } from "../../actions/analytics";

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    analyticsPageViewAction: () => dispatch(pageView())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
