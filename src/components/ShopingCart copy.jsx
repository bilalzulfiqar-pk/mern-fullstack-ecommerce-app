import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const cartItems = [
  {
    id: 1,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 78.99,
    qty: 9,
    discount: 5,
    tax: 2,
    image: "cloth/1.jpg",
  },
  {
    id: 2,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Best factory LLC",
    price: 39.0,
    qty: 3,
    discount: 3,
    tax: 1.5,
    image: "interior/3.jpg",
  },
  {
    id: 3,
    name: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 170.5,
    qty: 1,
    discount: 10,
    tax: 5,
    image: "interior/1.jpg",
  },
];

const ShoppingCart = () => {
  const [items, setItems] = useState(cartItems);

  const updateQty = (id, qty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: parseInt(qty) } : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalDiscount = items.reduce((acc, item) => acc + item.discount * item.qty, 0);
  const totalTax = items.reduce((acc, item) => acc + item.tax * item.qty, 0);
  const total = subtotal - totalDiscount + totalTax;

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-3/4 bg-white border border-[#E0E0E0] rounded-md p-4">
        {items.map((item) => (
          <div key={item.id} className="flex max-[500px]:flex-col border-b border-[#E0E0E0] py-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 border border-[#E0E0E0] rounded-md h-20 object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-base text-gray-500">
                Size: {item.size}, Color: {item.color}, Material: {item.material}
                <br /> Seller: {item.seller}
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-red-500 border border-[#E0E0E0] transition duration-300 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
                  Remove
                </button>
                <button className="text-blue-500 border border-[#E0E0E0] transition duration-300 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
                  Save for later
                </button>
              </div>
            </div>
            <div className="text-right flex flex-col max-[500px]:flex-row max-[500px]:justify-end max-[500px]:items-center max-[500px]:gap-3 ">
              <p className="text-lg ">${item.price.toFixed(2)}</p>
              <p className="text-red-500">- ${item.discount.toFixed(2)}</p>
              <p className="text-green-500">+ ${item.tax.toFixed(2)}</p>
              <div className="relative">
                <select
                  className="min-[500px]:mt-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 border border-[#E0E0E0] appearance-none shadow-2xs rounded-md px-2 pr-10 py-1"
                  onChange={(e) => updateQty(item.id, e.target.value)}
                  value={item.qty}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      Qty: {n + 1}
                    </option>
                  ))}
                </select>
                <div className="absolute z-10 top-1/2 right-2 transform -translate-y-[33%] pointer-events-none text-2xl text-gray-400">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-1/4">
        {/* Coupon Section */}
        <div className="p-4 border border-[#E0E0E0] rounded-lg mb-3 bg-white">
          <p className="text-gray-700 mb-2">Have a coupon?</p>
          <div className="flex border border-[#E0E0E0] rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Add coupon"
              className="w-full px-3 py-2 text-gray-500 border-none outline-none"
            />
            <button className="px-4 py-2 border-l border-[#E0E0E0] text-blue-500 font-medium hover:bg-gray-100 duration-300 cursor-pointer transition">
              Apply
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="p-4 rounded-lg shadow-md bg-white">
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-red-500">- ${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span className="text-green-500">+ ${totalTax.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4 border-[#E0E0E0] flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span className="text-black">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;