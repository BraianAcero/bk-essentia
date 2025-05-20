import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-serif font-bold text-black mb-4">404 - Página No Encontrada</h1>
      <p className="text-lg text-gray-700 mb-8">La página que estás buscando no existe.</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  )
}
