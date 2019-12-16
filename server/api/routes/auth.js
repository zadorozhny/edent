import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Profile from '@/services/profile';

const router = Router();

router.post('/signin', async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).signin(req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).signup(req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).forgotPassword(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/reset-password', async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).resetPassword(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/refresh', auth.expired, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).refresh(req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/signout', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).signout());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
