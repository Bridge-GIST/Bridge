const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(
        createProxyMiddleware("/signup", {
            target: "http://localhost:8000",
            changeOrigin: true,
        }),
    );

    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:8000",
            changeOrigin: true,
        }),
    );
}