/* eslint-disable no-useless-return */
import OptimizeImages from './image-optimization/index.js';

(async () => {
  await OptimizeImages('./static/media', 800, 'optimized', false, ['optimized-mobile']);
  console.log('Optimized images in static/media for PC');
  await OptimizeImages('./static/media', 512, 'optimized-mobile', false, ['optimized']);
  console.log('Optimized images in static/media for mobile');

  await OptimizeImages('./static/trip', 1024, 'optimized', true, ['optimized-mobile']);
  console.log('Optimized images in static/trip for PC');
  await OptimizeImages('./static/trip', 512, 'optimized-mobile', true, ['optimized']);
  console.log('Optimized images in static/trip for mobile');
  process.exit(0);
})();
