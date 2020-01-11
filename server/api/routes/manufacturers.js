import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Manufacturers from '@/services/manufacturers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Manufacturers.init(req.user).getList(req.query));
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    res.json(await Manufacturers.init(req.user).create(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Manufacturers.init(req.user).getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Manufacturers.init(req.user).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Manufacturers.init(req.user).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
