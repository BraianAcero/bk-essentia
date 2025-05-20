export default async function sitemap() {
  // Definir las categorías disponibles
  const categories = ["men", "women", "arabian", "unisex"]

  // Crear URLs para cada categoría
  const categoryUrls = categories.map((category) => ({
    url: `https://bk-essentia.vercel.app/collections/${category}`,
    lastModified: new Date(),
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
    lastModified: new Date(),
  }))

  // Combinar todas las URLs
  return [...staticUrls, ...categoryUrls]
}
