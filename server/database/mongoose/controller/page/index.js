import aboutPageData from './about';
import featurePageData from './feature';
import featuresPageData from './features';
import homePageData from './home';

export const getHomePageData = (req, res) => {
  homePageData(req, res);
};

export const getAboutPageData = (req, res) => {
  aboutPageData(req, res);
};

export const getFeaturePageData = (req, res) => {
  featurePageData(req, res);
};

export const getFeaturesPageData = (req, res) => {
  featuresPageData(req, res);
};
