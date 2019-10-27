import { Router } from 'express';
import auth from '@/api/middlewares/auth';

const router = Router();

router.post('/', auth, async (req, res, next) => {
  try {
    res.json({
      status: 'ok'
    });
  } catch (err) {
    next(err);
  }
});

export const routes = router;
