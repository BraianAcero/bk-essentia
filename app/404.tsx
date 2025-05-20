export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-serif font-bold text-black mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">The page you are looking for does not exist.</p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Return to Home
      </a>
    </div>
  )
}
