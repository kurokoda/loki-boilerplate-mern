import express from 'express';
import {
  getAboutPageData,
  getFeaturePageData,
  getFeaturesPageData,
  getHomePageData
} from '../controller/page';

const route = '/api/page/';
const router = express.Router();

// auth:login -------------------------------------------------------------------

router.get(`${route}about`, (req, res) => getAboutPageData(req, res));

router.get(`${route}feature`, (req, res) => getFeaturePageData(req, res));

router.get(`${route}features`, (req, res) => getFeaturesPageData(req, res));

router.get(`${route}home`, (req, res) => getHomePageData(req, res));

// exports -------------------------------------------------------------------
export default router;
