import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Profile from '@/services/profile';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).get());
  } catch (err) {
    next(err);
  }
});

router.patch('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/email', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).updateEmail(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/unicity/email', async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).isEmailUnique(req.query));
  } catch (err) {
    next(err);
  }
});

router.patch('/password', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).updatePassword(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.user).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
