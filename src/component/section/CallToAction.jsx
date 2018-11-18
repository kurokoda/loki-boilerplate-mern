import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import { getIncrementedElementName } from "../../utils/collection";
import CallToActionTile from "../tile/CallToAction";
import EmailSignup from "../tile/EmailSignup";

// Exports -----------------------------

export default class CallToActionSection extends Component {
  render() {
    const { config } = this.props;
    const callsToAction = config.get("callsToAction");

    return (
      <div className={css(styles.content)}>
        {callsToAction.map((callToAction, index) => (
          <div
            key={getIncrementedElementName("callToAction")}
            className={css(styles.callToAction)}
          >
            {callToAction.get("action") === "email" ? (
              <EmailSignup config={callToAction} />
            ) : (
              <CallToActionTile config={callToAction} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

CallToActionSection.propTypes = {
  config: ImmutablePropTypes.map.isRequired
};

const styles = StyleSheet.create({
  content: {
    textAlign: "center",
    width: "calc(100% + 20px)",
    display: "inline-flex",
    margin: "40px 0 20px -20px"
  },
  callToAction: {
    width: "100%",
    margin: "0 0 0 20px"
  }
});
