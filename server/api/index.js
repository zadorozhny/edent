import { Router } from 'express';
import glob from 'glob';
import bodyParser from 'body-parser';
import path from 'path';

const router = Router();

router.use(bodyParser.json());

glob
  .sync('./routes/**.js', { cwd: __dirname })
  .forEach(direction => {
    const { routes } = require(direction);
    const extension = path.extname(direction);
    router.use(`/${path.basename(direction, extension)}`, routes);
  });

export default router;
