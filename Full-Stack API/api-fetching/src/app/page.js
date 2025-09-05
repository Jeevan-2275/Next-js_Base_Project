"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Next.js Rendering & API Demo</h1>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:text-yellow-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-yellow-300">About</Link></li>
          <li><Link href="/csr" className="hover:text-yellow-300">CSR</Link></li>
          <li><Link href="/ssr" className="hover:text-yellow-300">SSR</Link></li>
          <li><Link href="/ssg" className="hover:text-yellow-300">SSG</Link></li>
          <li><Link href="/isr" className="hover:text-yellow-300">ISR</Link></li>
          <li><Link href="/products" className="hover:text-yellow-300">Products</Link></li>
          <li><Link href="/carts" className="hover:text-yellow-300">Carts</Link></li>
          <li><Link href="/users" className="hover:text-yellow-300">Users</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          🚀 Next.js Rendering & API Demo
        </h2>
        <p className="text-gray-700 mb-8 max-w-2xl">
          This project shows <b>Next.js routing</b>, <b>API fetching</b>, and different rendering modes:
          <span className="text-blue-600 font-semibold"> CSR</span>,
          <span className="text-blue-600 font-semibold"> SSR</span>,
          <span className="text-blue-600 font-semibold"> SSG</span>, and
          <span className="text-blue-600 font-semibold"> ISR</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/csr" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⚡ CSR</h3>
            <p className="text-gray-600">Client-Side Rendering demo</p>
          </Link>
          <Link href="/ssr" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🖥 SSR</h3>
            <p className="text-gray-600">Server-Side Rendering demo</p>
          </Link>
          <Link href="/ssg" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📦 SSG</h3>
            <p className="text-gray-600">Static Site Generation demo</p>
          </Link>
          <Link href="/isr" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⏱ ISR</h3>
            <p className="text-gray-600">Incremental Static Regeneration demo</p>
          </Link>
          <Link href="/products" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🛍 Products</h3>
            <p className="text-gray-600">API fetching example</p>
          </Link>
          <Link href="/carts" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🛒 Carts</h3>
            <p className="text-gray-600">Manage cart data</p>
          </Link>
          <Link href="/users" className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">👤 Users</h3>
            <p className="text-gray-600">Fetch users from API</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
