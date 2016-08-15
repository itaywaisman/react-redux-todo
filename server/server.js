import bodyParser from 'body-parser';
import compression from 'compression';
import Express from 'express';
import path from 'path';


const app = Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  // Webpack Requirements
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}




app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, function (err) {
  console.log('server running on port 3000');
})
