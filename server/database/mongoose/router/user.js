import express from 'express';
import { create, destroy, list, read, update } from '../controller/user';

const route = '/api/user/';
const router = express.Router();

// create -------------------------------------------------------------------
router.post(`${route}`, (req, res) => {
  create(req, res);
});

// read -------------------------------------------------------------------
router.get(`${route}:id`, (req, res) => {
  read(req, res);
});

// update -------------------------------------------------------------------
router.patch(`${route}:id`, (req, res) => {
  update(req, res);
});

// destroy -------------------------------------------------------------------
router.delete(`${route}:id`, (req, res) => {
  destroy(req, res);
});

// list -------------------------------------------------------------------
router.get(`${route}`, (req, res) => {
  list(req, res);
});

// exports -------------------------------------------------------------------

module.exports = router;
