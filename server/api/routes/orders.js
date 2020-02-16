import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Orders from '@/services/orders';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.user).getList(req.query));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await Orders.init(req.user).create(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.user).getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.user).update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Orders.init(req.user).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
