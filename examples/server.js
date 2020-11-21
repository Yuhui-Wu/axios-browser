const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');




const app = express();
const compiler = webpack(webpackConfig);

const router = express.Router();

router.get('/simple/get', function(req, res) {
    res.json({
        msg: `hello world`
    })
});

app.use(router);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/build/',
    stats: {
        colors: true,
        chunks: false
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.port || 8081;
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
})