import Link from "next/link"

const GlobalFooter = () => {
    return(
        <footer className="border-t bg-gray-50 py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-1">
                <div className="h-6 w-6 rounded-full bg-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">
                ChatWithStrangers
              </span>
            </div>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Contact Us
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} ChatConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    )
}

export default GlobalFooter