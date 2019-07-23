import { Router } from 'express';

const router = Router();

router.get('/products/', async (req, res) => {
  try {
    res.json({ reply: 'reply' });
  } catch (err) {
    next(err);
  }
});

export const routes = router;
