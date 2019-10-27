import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Profile from '@/services/profile';

const router = Router();

router.get('/confirmation', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).getConfirmation());
  } catch (err) {
    next(err);
  }
});

router.get('/confirmation/resend', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).resendConfirmation());
  } catch (err) {
    next(err);
  }
});

router.patch('/confirm', auth, async (req, res, next) => {
  try {
    res.json(await Profile.init(req.state).confirmEmail(req.body));
  } catch (err) {
    next(err);
  }
});

export const routes = router;
