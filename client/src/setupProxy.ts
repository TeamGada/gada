import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
    app.use(
        createProxyMiddleware('', {
            target: 'http://localhost:5000',
            changeOrigin: true,
        }),
    );
};
