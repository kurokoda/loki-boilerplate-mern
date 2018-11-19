import express from 'express';
import {
  passwordResetRequest,
  signIn,
  signOut,
  signUp
} from '../controller/auth';

const route = '/api/auth/';
const router = express.Router();

// auth:login -------------------------------------------------------------------

router.post(`${route}signIn`, (req, res) => {
  signIn(req, res);
});

// auth:logout -------------------------------------------------------------------

router.get(`${route}signOut`, (req, res) => {
  signOut(req, res);
});

// signup -------------------------------------------------------------------

router.post(`${route}signUp`, (req, res) => {
  signUp(req, res);
});

// signup -------------------------------------------------------------------

router.post(`${route}passwordResetRequest`, (req, res) => {
  passwordResetRequest(req, res);
});

// exports -------------------------------------------------------------------

export default router;
