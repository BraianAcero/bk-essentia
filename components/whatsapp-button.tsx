import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  // Replace this with your actual WhatsApp number
  const whatsappNumber = "1234567890"
  const whatsappMessage = "Hello! I would like to know more about your perfumes."

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
