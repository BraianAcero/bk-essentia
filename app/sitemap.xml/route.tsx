export const dynamic = "force-static"

export function GET() {
  // Definir las categorías disponibles
  const categories = ["men", "women", "arabian", "unisex"]

  // Crear URLs para cada categoría
  const categoryUrls = categories.map((category) => ({
    url: `https://bk-essentia.vercel.app/collections/${category}`,
    lastmod: new Date().toISOString(),
  }))

  // Crear URLs para las páginas estáticas principales
  const staticUrls = [
    "https://bk-essentia.vercel.app/",
    "https://bk-essentia.vercel.app/about",
    "https://bk-essentia.vercel.app/contact",
    "https://bk-essentia.vercel.app/privacy-policy",
    "https://bk-essentia.vercel.app/terms-of-service",
    "https://bk-essentia.vercel.app/admin",
  ].map((url) => ({
    url,
    lastmod: new Date().toISOString(),
  }))

  // Combinar todas las URLs
  const allUrls = [...staticUrls, ...categoryUrls]

  // Generar el XML manualmente
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`

  // Devolver el XML como respuesta
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
