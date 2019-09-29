import { Router } from 'express';
import auth from '@/api/middlewares/auth';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json({ reply: 'reply' });
  } catch (err) {
    next(err);
  }
});

export const routes = router;
