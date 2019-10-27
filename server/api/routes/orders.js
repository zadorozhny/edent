import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Orders from '@/services/orders';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.state).get(req.query));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.state).getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.state).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.state).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
