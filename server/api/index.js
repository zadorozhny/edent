import { Router } from 'express';
import glob from 'glob';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());

glob
  .sync('./routes/**.js', { cwd: __dirname })
  .forEach(path => {
    const { routes } = require(path);
    router.use('/api', routes);
  });

export default router;
