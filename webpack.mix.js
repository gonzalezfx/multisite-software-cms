const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/site.js', 'public/js');
mix.sass('resources/sass/site.scss', 'public/css').options({
  processCssUrls: false,
});
mix.copy(
  'node_modules/@fortawesome/fontawesome-free/webfonts/*',
  'public/webfonts/'
);

mix.sass('resources/sass/auth.scss', 'public/css');

mix.react('resources/js/admin.js', 'public/js');
mix.sass('resources/sass/admin.scss', 'public/css');

if (mix.inProduction()) {
  mix.version();
} else {
  mix.browserSync({
    proxy: process.env.APP_URL,
    files: [
      'resources/views/**/*.php',
      'app/**/*.php',
      'routes/**/*.php',
      'public/js/*.js',
      'public/css/*.css',
    ],
  });
}
