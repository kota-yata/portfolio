import OptimizeImages from './image-optimization/index.js';

try {
  console.log('Optimizing images in static/media for PC');
  OptimizeImages('./static/media', 800, 'optimized', ['optimized-mobile']);
  console.log('Optimizing images in static/media for mobile');
  OptimizeImages('./static/media', 512, 'optimized-mobile', ['optimized']);

  console.log('Optimizing images in static/trip for PC');
  OptimizeImages('./static/trip', 1024, 'optimized', ['optimized-mobile']);
  console.log('Optimizing images in static/trip for mobile');
  OptimizeImages('./static/trip', 512, 'optimized-mobile', ['optimized']);
} catch (reason) {
  console.error(reason);
}
