import Express from 'express';
import { Nuxt, Builder } from 'nuxt';
import config from 'nuxt.config';
import api from '@/api';

export default async (port, host) => {
  const app = new Express();

  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }

  app.use(api);
  
  app.use(nuxt.render);

  app.listen(port, host);
};
