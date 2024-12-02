import Link from "next/link";

export function Menu() {
    return (
        <nav className="w-full max-w-lg rounded-lg p-4 mb-8">
        <ul className="flex justify-center gap-6">
          <li>
            <Link href="/analyze" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Analyze
            </Link>
          </li>
          <li>
            <Link href="/create" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Create
            </Link>
          </li>
          <li>
            <Link href="/read" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Read
            </Link>
          </li>
        </ul>
      </nav>
    );
}