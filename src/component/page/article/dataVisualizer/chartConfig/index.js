import HighCharts from "highcharts/highstock.src";
import { css, StyleSheet } from "aphrodite";
//
import RIVAL from "../rival";

/**
 * @function prepareYinSeries
 * @param {Number} value
 * @param {Number} key
 * @description hydrates the data for the yin data series
 */
export function prepareYinSeries(value, key) {
  return {
    id: RIVAL.CHART.YIN_SERIES,
    name: key.replace("yin_", ""),
    color: RIVAL.COLOR.JAVA,
    data: value,
    threshold: null,
    turboThreshold: 1000,
    type: "area",
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0.8
      },
      stops: [[0, "rgba(48,199,191,.5)"], [1, "rgba(48,199,191,0)"]]
    }
  };
}

/**
 * @function prepareYangSeries
 * @param {Number} value
 * @param {Number} key
 * @description hydrates the data for the yang data series
 */
export function prepareYangSeries(value, key) {
  return {
    id: RIVAL.CHART.YANG_SERIES,
    name: key.replace("yang_", ""),
    color: RIVAL.COLOR.WATERMELON,
    data: value,
    threshold: null,
    turboThreshold: 1000,
    type: "area",
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0.8
      },
      stops: [[0, "rgba(255,108,121,.5)"], [1, "rgba(255,108,121,0)"]]
    }
  };
}

export function getChartConfig(onLoadCallback, yinSeries, yangSeries) {
  const getStyles = () =>
    StyleSheet.create({
      dataVizLayout: {
        width: "490px",
        left: "11px",
        position: "absolute",
        top: "54px"
      }
    });
  const styles = getStyles();
  return {
    chart: {
      height: "200px",
      className: css(styles.dataVizLayout),
      type: "area",
      renderTo: "dataviz",
      backgroundColor: null,
      animation: HighCharts.svg,
      cropThreshold: 300,
      spacing: [0, 0, 0, 0],
      zoomType: "",
      pinchType: "",
      panning: false,
      events: {
        load: onLoadCallback
      },
      resetZoomButton: {
        theme: {
          display: "none"
        }
      }
    },
    colors: [RIVAL.COLOR.JAVA, RIVAL.COLOR.WATERMELON],
    plotOptions: {
      series: {
        turboThreshold: 0,
        connectNulls: true,
        lineWidth: 3,
        allowPointSelect: false,
        dataLabels: {
          enabled: false
        },
        marker: {
          enabled: false
        },
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    xAxis: {
      type: "datetime",
      labels: {
        enabled: false
      },
      visible: false,
      crosshair: false,
      lineWidth: 0,
      tickWidth: 0,
      gridLineWidth: 0,
      minorGridLineWidth: 0
    },
    yAxis: {
      labels: {
        enabled: false
      },
      visible: false,
      lineWidth: 0,
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      maxPadding: 0.01,
      minPadding: 0.25,
      startOnTick: false,
      endOnTick: false
    },
    rangeSelector: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    series: [yinSeries, yangSeries]
  };
}
