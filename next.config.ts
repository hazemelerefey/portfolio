import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const contentSecurityPolicyReportOnly = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://cdn.jsdelivr.net https://assets.aceternity.com https://api.dicebear.com https://illustrations.popsy.co https://images.cnippet.dev https://picsum.photos https://res.cloudinary.com https://upload.wikimedia.org",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "connect-src 'self' https://github-contributions-api.jogruber.de https://api.dicebear.com",
    "frame-src 'self' https://prod.spline.design https://www.youtube.com https://drive.google.com",
].join('; ');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'assets.aceternity.com' }
        ],
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()' },
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                    { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicyReportOnly },
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
