# Gulp - ES6 Tasks

Gulp build system that transpiles ES6 JS, including bundling modules for client-side use. Supports a local server and hot reloading of assets via `Browsersync`. Also generates a production ready build with cache-busting and minification.

This repo also includes a `site` directory that provides an example of the expected project structure. These path references can be configured via the `paths` object in `gulpfile.js`.

#### Prerequisites
- NodeJS
- NPM
- Working knowledge of Gulp

#### Features
- ES6 syntax transpiling via `Babel`
- ES6 module support via `Browserify`
- SCSS compilation
- CSS autoprefixing
- Local server with live reloading
- Minified, bundled production build

#### Tasks
- `gulp`, `gulp watch`
  - Starts a local server at `localhost` and compiles/transpiles your SCSS and JS, placing the output in `site/compiled`.
  - Gulp then watches SCSS and JS directories for changes, hot reloading the browser when a change is detected.
- `gulp build`
  - Creates a production ready build in `dist`.
  - CSS and JS are minified
  - HTML script and stylesheet references are cache-busted

<hr>

#### Notes
This repo is primarily intended to provide a jumping off point for small projects featuring ES6 JavaScript and SCSS. Additional updates will be limited, and without a great deal of consideration for configuration.

#### Coming Soon
- Image compression via `gulp-imagemin`
- Expanded production build that includes fonts and images
