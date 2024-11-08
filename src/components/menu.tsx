export function Menu() {
    return (
        <nav className="w-full max-w-lg rounded-lg p-4 mb-8">
        <ul className="flex justify-center gap-6">
          <li>
            <a href="" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Analyze
            </a>
          </li>
          <li>
            <a href="/create" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Create
            </a>
          </li>
          <li>
            <a href="/read" className="text-lg text-white hover:text-red-600 hover:underline transition-all">
              Read
            </a>
          </li>
        </ul>
      </nav>
    );
}