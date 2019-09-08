import { Router } from 'express';
import auth from '@/api/middlewares/auth';
const router = Router();

router.get('/products/', auth, async (req, res) => {
  try {
    res.json({ reply: 'reply' });
  } catch (err) {
    next(err);
  }
});

export const routes = router;
