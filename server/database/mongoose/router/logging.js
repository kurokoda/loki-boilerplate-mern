import express from 'express';
import { create, destroy, list, read, update } from '../controller/user';

const route = '/api/logging/';
const router = express.Router();

// create -------------------------------------------------------------------
router.post(`${route}`, (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

// read -------------------------------------------------------------------
router.get(`${route}:id`, (req, res) => {
});

// update -------------------------------------------------------------------
router.patch(`${route}:id`, (req, res) => {
});

// destroy -------------------------------------------------------------------
router.delete(`${route}:id`, (req, res) => {
});

// list -------------------------------------------------------------------
router.get(`${route}`, (req, res) => {
});

// exports -------------------------------------------------------------------

module.exports = router;
