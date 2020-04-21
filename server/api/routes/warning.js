import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Warning from '@/services/warning';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Warning.init(req.user).find(req.query));
  } catch (err) {
    next(err);
  }
});

router.put('/', auth, async (req, res, next) => {
  try {
    res.json(await Warning.init(req.user).update(req.body));
  } catch (err) {
    next(err);
  }
});

export const routes = router;
