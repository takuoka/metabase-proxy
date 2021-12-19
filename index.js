const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const METABASE_URL = JSON.parse(fs.readFileSync("secrets.json")).metabaseUrl;

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to metabase API.');
});

// // Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });


// Cross Originを解除
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(
    cors({
        origin: "*",
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Proxy endpoints
app.use('/metabase-proxy', createProxyMiddleware({
    target: METABASE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/metabase-proxy`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});