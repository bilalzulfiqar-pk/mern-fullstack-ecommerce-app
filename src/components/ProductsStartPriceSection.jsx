import React from 'react'
import { Link } from 'react-router-dom'

const ProductsStartPriceSection = ({products, heading, link, banner}) => {
  return (
    <div>
      <div className="mt-6 mx-32 h-72 grid grid-cols-[0.6fr_2fr] max-[1080px]:grid-cols-1 overflow-hidden rounded-lg border border-[#E0E0E0] bg-white">
          <div className="bg-cover" style={{ backgroundImage: `url(${banner})` }}>
            <header className="pt-6 mx-5 ">
              <h3 className="text-2xl font-bold">{heading}</h3>
            </header>
            <Link to={link}>
            <button className="ml-5 mt-4 px-4 py-2 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300">
              Source Now
            </button>
            </Link>
          </div>

          <div className="max-[1080px]:overflow-x-auto">
            <div className="grid h-full grid-cols-4 max-[1080px]:grid-cols-[repeat(8,minmax(200px,1fr))] max-[1080px]:w-max">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-[#E0E0E0] p-4 flex flex-col"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="absolute bottom-0 right-0 w-[72px] h-[72px] object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    From USD {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductsStartPriceSection
