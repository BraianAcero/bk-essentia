import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
            Discover the story behind BK ESSENTIA and our passion for fine fragrances
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6 text-black">Our Story</h2>
            <p className="text-gray-700 mb-4">
              BK ESSENTIA was founded in 2015 with a simple mission: to create exceptional fragrances that capture the
              essence of luxury and sophistication. What began as a small boutique in the heart of the city has grown
              into a renowned brand with a global presence.
            </p>
            <p className="text-gray-700 mb-4">
              Our founder, with over 20 years of experience in the perfume industry, assembled a team of skilled
              perfumers who share a passion for creating unique and captivating scents. Together, they have developed
              our signature collections that cater to diverse preferences and occasions.
            </p>
            <p className="text-gray-700">
              At BK ESSENTIA, we believe that a fragrance is more than just a scent—it's an expression of personality, a
              memory in the making, and a finishing touch to any appearance.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Our perfume laboratory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-black">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Quality</h3>
              <p className="text-gray-700">
                We source only the finest ingredients from around the world to create fragrances that are rich, complex,
                and long-lasting. Each bottle undergoes rigorous quality control to ensure excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Craftsmanship</h3>
              <p className="text-gray-700">
                Our perfumers blend traditional techniques with modern innovation to create scents that are both
                timeless and contemporary. Each fragrance is meticulously crafted to achieve perfect harmony.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to ethical sourcing and environmentally responsible practices. Our packaging is
                designed to minimize waste, and we continuously work to reduce our ecological footprint.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-black">Meet Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-black">Sarah Johnson</h3>
            <p className="text-gray-600">Founder & Creative Director</p>
          </div>

          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-black">David Chen</h3>
            <p className="text-gray-600">Master Perfumer</p>
          </div>

          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-black">Maria Rodriguez</h3>
            <p className="text-gray-600">Head of Product Development</p>
          </div>

          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-black">James Wilson</h3>
            <p className="text-gray-600">Chief Operations Officer</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Experience Our Collections</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our exquisite range of fragrances crafted to elevate your essence and leave a lasting impression.
          </p>
          <Link
            href="/collections/men"
            className="inline-flex items-center px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
