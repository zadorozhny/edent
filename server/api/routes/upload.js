import { Router } from 'express';
import { Uploader } from '@/lib/Uploader';
import auth from '@/api/middlewares/auth';

const router = Router();

router.get('/', auth, async (_, res, next) => {
  try {
    const data = await Uploader.getUrl();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

export const routes = router;
