import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as conf from './webpack.server.config';
import { app, start } from './server';

const compiler = webpack({
  ...conf,
  entry: {
    'server': './dist/server/main',
    'main': ['webpack-hot-middleware/client', './dist/browser/main']
  },
  module: undefined,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: conf.output.publicPath,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

process.on('SIGINT', () => process.exit(0));

start();
