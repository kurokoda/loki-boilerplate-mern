import { css, StyleSheet } from "aphrodite";
import _ from "lodash";
import React, { Component } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";
import io from "socket.io-client";
import { getIncrementedElementName } from "../../../../utils/collection";
import {
  getChartConfig,
  prepareYangSeries,
  prepareYinSeries
} from "./chartConfig";
import RIVAL from "./rival";

class DataVisualizer extends Component {
  static propTypes = {
    article: ImmutablePropTypes.map.isRequired
  };

  componentDidMount() {
    this.highcharts = require("highcharts/highstock"); // eslint-disable-line global-require
    this.highcharts.setOptions(DataVisualizer.OPTIONS);

    this.initSocketIO();
    this.drawChart();
  }

  render() {
    const classes = getClasses();

    return (
      <div className={classes.dataVizContainer}>
        <img
          className={classes.dataVizBackground}
          src="/images/dataviz-bg.png"
        />
        <div className={classes.dataVizHeaderText}>Real-time Voting</div>
        <div id="dataviz" />
        <div className={classes.hashTagsContainer}>{this.hashTags()}</div>
      </div>
    );
  }

  // Business logic

  static OPTIONS = {
    global: {
      useUTC: false,
      backgroundColor: "black"
    }
  };

  hashTags = () => {
    const { article } = this.props;
    const classes = getClasses();

    return ["yin", "yang"].map((type, index) => (
      <div
        className={classes.hashTag}
        key={getIncrementedElementName("hashTag")}
      >
        <div className={classes[`${type}`]} />
        <div>
          {article
            .get("voting")
            .get(type)
            .get("hashtag")}
        </div>
      </div>
    ));
  };

  drawChart = () => {
    let yinSeries = [];
    let yangSeries = [];

    _.forOwn(this.props.article.get("dataViz").toJS(), (value, key) => {
      if (key.match(/^yin/) !== null) {
        yinSeries = prepareYinSeries(value, key);
      } else if (key.match(/^yang/) !== null) {
        yangSeries = prepareYangSeries(value, key);
      }
    });

    this.chart = this.highcharts.StockChart(
      getChartConfig(
        this.addClosingPointsToChart.bind(this),
        yinSeries,
        yangSeries
      )
    );
  };

  initSocketIO = () => {
    const getYinHashtag = () =>
      this.props.article
        .get("voting")
        .get("yin")
        .get("hashtag");

    const getYangHashtag = () =>
      this.props.article
        .get("voting")
        .get("yang")
        .get("hashtag");

    const socketURL = `https://${
      process.env.REACT_APP_NAMESPACE
    }.kubernetes.thetylt.com`;

    this.socket = io(socketURL);
    this.socket.on("connect", () => {
      this.socket.emit("subscribe", getYinHashtag(), getYangHashtag());
    });
    this.socket.on("score", data => {
      this.removeClosingPointsFromChart();

      const faction =
        data.hashtag === getYinHashtag()
          ? RIVAL.FACTION.YIN
          : RIVAL.FACTION.YANG;

      const timestamp = Date.now();
      this.addFrame(faction, data.score, timestamp);

      this.addClosingPointsToChart();
    });
  };

  addClosingPointsToChart = () => {
    const chart = this.highcharts.charts[this.highcharts.charts.length - 1];

    const timestamp = Date.now() + 5000;
    chart
      .get(RIVAL.CHART.YIN_SERIES)
      .addPoint([timestamp, _.last(chart.get(RIVAL.CHART.YIN_SERIES).yData)]);
    chart
      .get(RIVAL.CHART.YANG_SERIES)
      .addPoint([timestamp, _.last(chart.get(RIVAL.CHART.YANG_SERIES).yData)]);
  };

  removeClosingPointsFromChart = () => {
    const chart = this.highcharts.charts[this.highcharts.charts.length - 1];

    chart
      .get(RIVAL.CHART.YIN_SERIES)
      .data[chart.get(RIVAL.CHART.YIN_SERIES).data.length - 1].remove();
    chart
      .get(RIVAL.CHART.YANG_SERIES)
      .data[chart.get(RIVAL.CHART.YANG_SERIES).data.length - 1].remove();
  };

  addFrame = (faction, value, timestamp) => {
    const chart = this.highcharts.charts[this.highcharts.charts.length - 1];
    const rivals = [RIVAL.CHART.YIN_SERIES, RIVAL.CHART.YANG_SERIES];
    const [factionSeries, rivalSeries] =
      faction === RIVAL.FACTION.YIN ? rivals : rivals.reverse();

    if (chart) {
      chart.get(factionSeries).addPoint([timestamp, value], false, false);

      chart
        .get(rivalSeries)
        .addPoint(
          [timestamp, _.last(chart.get(rivalSeries).yData)],
          false,
          false
        );
    }
  };
}

const getClasses = () => {
  const styles = getStyles();

  return {
    dataVizContainer: css(styles.dataVizContainer),
    dataVizHeaderText: css(styles.dataVizHeaderText),
    dataVizBackground: css(styles.dataVizBackground),
    hashTagsContainer: css(styles.hashTagsContainer),
    hashTag: css(styles.hashTag),
    yang: css(styles.oval, styles.yang),
    yin: css(styles.oval, styles.yin)
  };
};

const getStyles = () =>
  StyleSheet.create({
    dataVizBackground: {
      border: "1px solid #D8D8D8",
      borderRadius: "6px",

      "@media (max-width: 540px)": {
        border: "0px solid #D8D8D8"
      }
    },
    dataVizContainer: {
      width: "100%",
      fontFamily: "Open Sans",
      fontSize: "12px",
      fontWeight: "600",
      margin: "auto auto 40px auto",
      overflow: "hidden",
      position: "relative"
    },
    dataVizHeaderText: {
      color: "#000000",
      fontSize: "14px",
      fontWeight: "bold",
      left: "15px",
      position: "absolute",
      top: "15px"
    },
    hashTagsContainer: {
      bottom: "12px",
      display: "flex",
      margin: "auto",
      justifyContent: "space-around",
      position: "absolute",
      width: "100%"
    },
    hashTag: {
      display: "flex",
      justifyContent: "space-around"
    },
    oval: {
      backgroundColor: "#4cd8ce",
      borderRadius: "50%",
      height: "15px",
      marginTop: "1px",
      marginRight: "5px",
      width: "15px"
    },
    yin: {
      backgroundColor: "#4cd8ce"
    },
    yang: {
      backgroundColor: "#f33182"
    }
  });

export default DataVisualizer;
