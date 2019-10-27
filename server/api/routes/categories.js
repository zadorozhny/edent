import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Categories from '@/services/categories';

const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.state).get(req.query));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.state).getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.state).create(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.state).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.state).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
