import Link from "next/link";
export default function header() {
  return (
    <header className="fixed z-20 backdrop-blur-xl bg-black/50 text-white w-full sticky-header">
      <div className="container mx-auto px-4">
        <div className="items-center justify-between py-4 grid grid-cols-[290px_1fr] gap-5 w-full">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold border-2 flex"
              aria-label="Company Home"
            >
              CODE<p className="ml-2 text-red-800 font-bold text-4xl">RED</p>
            </Link>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Link href="/login" className="hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
