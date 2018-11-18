import {connect} from "react-redux";
import Footer from "../../component/footer";

export function mapStateToProps() {
  return {noop: null};
}

export function mapDispatchToProps(dispatch) {
  return {noop: null};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
