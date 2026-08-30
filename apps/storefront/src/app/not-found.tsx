import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-neutral-500">
        The page you tried to access does not exist.
      </p>
      <Link className="underline" href="/">
        Go to frontpage
      </Link>
    </div>
  )
}
