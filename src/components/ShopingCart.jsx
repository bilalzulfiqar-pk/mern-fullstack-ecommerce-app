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
    discount: 5,
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

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  //   const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  //   const discount = 60;
  //   const tax = 14;
  //   const total = subtotal - discount + tax;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalDiscount = items.reduce(
    (acc, item) => acc + item.discount * item.qty,
    0
  );
  const totalTax = items.reduce((acc, item) => acc + item.tax * item.qty, 0);
  const total = subtotal - totalDiscount + totalTax;

  return (
    <div className="flex flex-col min-[900px]:flex-row gap-4">
      <div className="w-full min-[900px]:w-3/4 bg-white border border-[#E0E0E0] rounded-md p-4 max-[500px]:p-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex max-[500px]:flex-col border-b border-[#E0E0E0] py-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 border border-[#E0E0E0] rounded-md h-20 object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-base text-gray-500">
                Size: {item.size}, Color: {item.color}, Material:{" "}
                {item.material}
                <br /> Seller: {item.seller}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 border border-[#E0E0E0] transition duration-300 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  Remove
                </button>
                <button className="text-blue-500 border border-[#E0E0E0] transition duration-300 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
                  Save for later
                </button>
              </div>
            </div>
            <div className="text-right flex flex-col max-[500px]:flex-row max-[500px]:justify-end max-[500px]:items-center max-[500px]:gap-3 max-[375px]:flex-col max-[500px]:mt-2">
              <div className="flex flex-col max-[500px]:flex-row max-[500px]:gap-3 max-[500px]:justify-center max-[500px]:items-center">

              <p className="text-lg ">${item.price.toFixed(2)}</p>
              <p className="text-green-500">- ${item.discount.toFixed(2)}</p>
              <p className="text-red-500">+ ${item.tax.toFixed(2)}</p>
              </div>
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
        <div className="flex items-center justify-between w-full p-4">
          {/* Back to shop button */}
          <button className="flex justify-center items-center gap-2 px-4 py-2 text-white cursor-pointer transition duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 rounded-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to shop
          </button>

          {/* Remove all button */}
          <button
            onClick={clearCart}
            className="px-4 py-2 text-blue-500 hover:bg-gray-100 duration-300 cursor-pointer transition border font-semibold border-gray-300 rounded-lg"
          >
            Remove all
          </button>
        </div>
      </div>

      {/* Right */}

      <div className="w-full min-[900px]:w-1/4">
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
          {/* Subtotal, Discount, Tax */}
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-green-500">- ${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span className="text-red-500">+ ${totalTax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 border-t pt-4 border-[#E0E0E0] flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span className="text-black">${total.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-[#00B517] text-white py-4 text-lg mt-4 rounded-lg hover:bg-[#009814] duration-300 cursor-pointer transition">
            Checkout
          </button>

          {/* Payment Methods */}
          {/* <div className="flex justify-center space-x-2 mt-4">
            <img src="/visa.png" alt="Visa" className="h-6" />
            <img src="/mastercard.png" alt="MasterCard" className="h-6" />
            <img src="/paypal.png" alt="PayPal" className="h-6" />
            <img src="/apple-pay.png" alt="Apple Pay" className="h-6" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
