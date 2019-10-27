import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Profile from '@/services/profile';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).get());
  } catch (err) {
    next(err);
  }
});

router.patch('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/email', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).updateEmail(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/email', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).removeEmail());
  } catch (err) {
    next(err);
  }
});

router.get('/unicity/email', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).isEmailUnique(req.query));
  } catch (err) {
    next(err);
  }
});

router.patch('/password', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).updatePassword(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
