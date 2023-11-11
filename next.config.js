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
        ],
    },
}

module.exports = nextConfig
