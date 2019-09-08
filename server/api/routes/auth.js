import { Router } from 'express';
import auth from '@/api/middlewares/auth';
const router = Router();

router.post('/signin', async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).signin(ctx.request.body);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).signup(ctx.request.body);
  } catch (err) {
    next(err);
  }
});

router.post('/forgot-password', async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).forgotPassword(ctx.request.body);
  } catch (err) {
    next(err);
  }
});

router.patch('/reset-password', async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).resetPassword(ctx.request.body);
  } catch (err) {
    next(err);
  }
});

router.patch('/refresh', auth.expired, async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).refresh(ctx.request.body);
  } catch (err) {
    next(err);
  }
});

router.post('/signout', auth, async ctx => {
  try {
    ctx.body = await Profile.init(ctx.state).signout();
  } catch (err) {
    next(err);
  }
});

export const routes = router.routes();
