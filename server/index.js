import application from '@/app';
import { APP } from '@/config';

const host = APP.HOSTNAME;
const port = APP.PORT;

application(port, host)
  .then(() => console.log(`Server listening on http://${host}:${port}`))
  .catch(console.error);
