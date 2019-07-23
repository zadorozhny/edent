import application from '@/app';

const host = process.env.APP_HOSTNAME;
const port = process.env.APP_PORT;

application(port, host)
  .then(() => console.log(`Server listening on http://${host}:${port}`))
  .catch(console.error);

