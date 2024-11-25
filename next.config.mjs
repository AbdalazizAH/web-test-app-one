/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pyauuapknnwofmrymguv.supabase.co',
                pathname: '/storage/v1/object/public/fast/media/products/**',
            },
        ],
    },
};

export default nextConfig;
