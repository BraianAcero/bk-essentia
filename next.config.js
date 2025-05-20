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
  // Esta configuración permite que las rutas funcionen correctamente con archivos index.html
  // Y hace que Next.js genere /ruta/index.html en lugar de /ruta.html
}

module.exports = nextConfig
