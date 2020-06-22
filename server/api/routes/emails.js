import { Router } from 'express';
import Mailer from '@/lib/Mailer';

const router = Router();

router.post('/callback', async (req, res, next) => {
  try {
    await Mailer.sendCallback(req.body);
    res.send({});
  } catch (err) {
    next(err);
  }
});

export const routes = router;
