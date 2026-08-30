import { Metadata } from "next"

export const metadata: Metadata = {
  title: "aimee by j",
}

export default function Home() {
  return (
    <div className="content-container flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">aimee by j — storefront</h1>
      <p className="text-neutral-500">
        UI removed. Data layer (<code>src/lib/data</code>) and middleware are
        intact. New tech stack pending.
      </p>
    </div>
  )
}
