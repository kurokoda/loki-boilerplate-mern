import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import { ResponsiveButton } from "../button";

const RESPONSIVE_WIDTH_BREAKPOINT = 950;

class EmailSignup extends Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubscriptionSuccess = this.onSubscriptionSuccess.bind(this);
    this.onSubscriptionError = this.onSubscriptionError.bind(this);

    this.state = {
      email: "",
      message: null,
      success: false,
    };
  }

  componentDidMount() {
    window.subscriptionCallback = response =>
      response.result === "success"
        ? this.onSubscriptionSuccess()
        : this.onSubscriptionError();
    window.addEventListener("resize", this.onResize);
    this.forceUpdate();
  }

  render() {
    const styles = EmailSignup.getStyles();
    const { success } = this.state;
    const doShowCollapsedButton = (window.innerWidth <= RESPONSIVE_WIDTH_BREAKPOINT);

    return success ? (
      <div className={css(styles.container)}>
        <div className={css(styles.successMessage)}>
          <span>Thank you for subscribing!</span>
        </div>
      </div>
    ) : (
      <div className={css(styles.content)}>
        <form>
          <div className={css(styles.title)}>
            <span>FIND OUT WHAT WINS!</span>
          </div>
          <div className={css(styles.text)}>
            Sign up for our weekly newsletter!
          </div>
          <div
            className={
              doShowCollapsedButton ? css(styles.rowMobile) : css(styles.rowDesktop)
            }
          >
            <input
              className={css(styles.input)}
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Your Email"
              type="email"
            />
            <div className={css(styles.buttonContainer)}>
              <ResponsiveButton
                icon={"fas fa-envelope"}
                theme={"aqua"}
                text={"SUBSCRIBE"}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
          <div>{this.state.message}</div>
        </form>
      </div>
    );
  }

  // Non-React functions

  onResize() {
    this.forceUpdate();
  }

  handleChange(event) {
    const email = event.target.value;
    const isValidEmail = EmailSignup.isValidEmail(email);

    this.setState({ email });
    if (isValidEmail) {
      this.setState({ message: "Almost there..." });
    } else {
      this.setState({ message: null });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (EmailSignup.isValidEmail) {
      this.subscribe();
    } else {
      this.setState({ message: "Please enter a valid email" });
    }
  }

  subscribe() {
    const url = `//twitter.us12.list-manage.com/subscribe/post-json?u=8dc041afe4eed96696fd68b5c&id=2d1ef3982e&EMAIL=${
      this.state.email
    }&b_8dc041afe4eed96696fd68b5c_2d1ef3982e&_=1518461153909&c=subscriptionCallback`;

    fetchJsonp(url, {
      jsonpCallback: "subscriptionCallback"
    })
      .then(response => response.json())
      .then(json => {
        console.log("parsed json", json);
      })
      .catch(error => {
        console.log("parsing failed", error);
      });
  }

  onSubscriptionSuccess() {
    this.setState({ success: true });
  }

  onSubscriptionError() {
    this.setState({ message: "This username is already subscribed." });
  }
}

EmailSignup.isValidEmail = string => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return string.match(emailRegex);
};

EmailSignup.getStyles = () =>
  StyleSheet.create({
    buttonContainer: {
      display: "inline-block"
    },
    content: {
      padding: "20px",
      border: "2px solid black",
      minHeight: "70px"
    },
    input: {
      border: "none",
      borderBottom: "1px solid black !important",
      display: "inline",
      fontSize: "18px",
      outline: "none",
      textAlign: "center",
      width: "240px"
    },
    rowMobile: {
      display: "inline-flex",
      margin: "24px 0 0 0"
    },
    rowDesktop: {
      display: "inline-flex",
      justifyContent: "space-around",
      width: "85%",

      "@media (min-width: 951px) and (max-width: 1100px)": {
        width: "100%"
      },

      "@media (min-width: 769px) and (max-width: 1006px)": {
        margin: "24px 0 0 0"
      }
    },
    title: {
      fontSize: "20px",
      fontWeight: "600"
    },
    text: {
      fontSize: "18px",
      fontWeight: "400",
      paddingBottom: "20px"
    },
    container: {
      padding: "20px",
      position: "relative",
      border: "2px solid black",
      height: "112px",

      "@media (min-width: 769px) and (max-width: 1006px)": {
        height: "136px"
      }
    },
    successMessage: {
      fontSize: "20px",
      fontWeight: "600",
      margin: "auto",
      position: "absolute",
      top: "50%",
      left: "0",
      right: "0"
    }
  });

export default EmailSignup;
