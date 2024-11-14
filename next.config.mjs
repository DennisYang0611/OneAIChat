/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NODE_ENV === 'development' 
                    ? 'http://127.0.0.1:3000/api/:path*'
                    : '/api/:path*',
            }
        ]
    },
    // 添加不安全的请求配置
    experimental: {
        externalDir: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });
        return config;
    },
    // 添加安全配置
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                ]
            }
        ]
    }
};

export default nextConfig;
