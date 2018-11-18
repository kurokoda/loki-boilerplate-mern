import { css, StyleSheet } from "aphrodite";
import React from "react";
import Loadable from "react-loadable";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Loading from "../../component/loading";

const TOPIC_REGEX = "(culture|entertainment|politics|sports)";

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "../page/home"),
  loading: Loading,
  modules: ["home"]
});

const Topic = Loadable({
  loader: () => import(/* webpackChunkName: "topic" */ "../page/topic"),
  loading: Loading,
  modules: ["topic"]
});

const Result = Loadable({
  loader: () => import(/* webpackChunkName: "result" */ "../page/result"),
  loading: Loading,
  modules: ["result"]
});

const Article = Loadable({
  loader: () => import(/* webpackChunkName: "article" */ "../page/article"),
  loading: Loading,
  modules: ["article"]
});

const Error = Loadable({
  loader: () => import(/* webpackChunkName: "error" */ "../page/error"),
  loading: Loading,
  modules: ["error"]
});

const Body = props => {
  const config = {
    headerHeight: 60,
    footerHeight: 60
  };
  const styles = Body.getStyles(config);

  return (
    <div name="body" className={css(styles.container)}>
      <Switch>
        <Route path="/" exact component={Home} props={props} />
        <Route
          path={`/:topic${TOPIC_REGEX}`}
          exact
          component={Topic}
          props={props}
        />
        <Route path="/results" exact component={Result} props={props} />
        <Route
          path={`/:topic${TOPIC_REGEX}/:article`}
          exact
          component={Article}
          props={props}
        />
        <Route component={Error} />
      </Switch>
    </div>
  );
};

Body.getStyles = config =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      display: "flex",
      fontFamily: "Avenir Next",
      justifyContent: "center",
      minHeight: `calc(100vh - ${config.headerHeight + config.footerHeight}px)`
    }
  });

export default withRouter(Body);
