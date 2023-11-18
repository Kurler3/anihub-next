/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fvdbmovmthylsjreouws.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/public-images/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.myanimelist.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
