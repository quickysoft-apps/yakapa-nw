const Bundler = require('parcel-bundler');
const Path = require('path');
const express_app = require('express')();

// Entrypoint file location
const file = Path.join(__dirname, './index.html');

// Bundler options
const options = {
  outDir: './dist',
  outFile: 'index.html',
  public: './',
  watch: true,
  cache: true,
  minify: false,
  target: 'browser',
  hmrPort: 0,
  sourceMaps: true,
  hmr: true,
  bundleNodeModules: true,
  logLevel: 4,
  detailedReport: true
};

async function runBundle() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(file, options);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.bundle();

  // let express handle things
  express_app.use(bundler.middleware());
  express_app.listen(8080);
}

runBundle();
