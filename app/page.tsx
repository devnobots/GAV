"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Page() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("/api/products")
      const products = await res.json()
      setProducts(products)
    }

    getProducts()
  }, [])

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Our Products</h2>
          <p className="mt-2 text-lg text-gray-500">Explore our wide range of high-quality products.</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="absolute top-2 right-2">
                <button className="relative h-11 w-11 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Image src="/cart.svg" alt="Add to cart" width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
