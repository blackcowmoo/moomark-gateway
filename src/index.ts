import getApp from '@/core/app';

(async () => {
  const app = await getApp();
  app.listen(7000, () => {
    console.log('Start API Gateway');
  });
})();
