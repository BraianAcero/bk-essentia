/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Asegurarse de que las rutas de API se manejen correctamente
  experimental: {
    appDocumentPreloading: false,
  },
}

module.exports = nextConfig
