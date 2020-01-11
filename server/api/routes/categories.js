import { Router } from 'express';
import auth from '@/api/middlewares/auth';
import Categories from '@/services/categories';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Categories.init(req.user).getList(req.query));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Categories.init(req.user).getOne(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.user).create(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.user).update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    res.json(await Categories.init(req.user).remove());
  } catch (err) {
    next(err);
  }
});

export const routes = router;
