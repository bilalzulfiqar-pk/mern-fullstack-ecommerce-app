import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../context/ProductContext";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { products, setProducts, loading } = useContext(ProductContext);
  const [updating, setUpdating] = useState(false); // State for updating
  const { id } = useParams(); // Get product ID from URL
  const [bulkError, setBulkError] = useState(false);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [product, setProduct] = useState({
    name: "",
    image: "",
    categories: [],
    currentPrice: "",
    previousPrice: "",
    tax: "",
    rating: "",
    reviews: "",
    orders: "",
    stock: "",
    shipping: "",
    description: "",
    type: "",
    material: "",
    sizes: [],
    customization: "",
    protection: "",
    warranty: "",
    thumbnails: [],
    supplier: {
      name: "",
      location: "",
      verified: false,
      worldwideShipping: false,
    },
    bulkPricing: [],
  });

  const [error, setError] = useState(null);
  const [valueError, setvalueError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      setProduct(products.find((p) => p._id === id) || null);
    }
  }, [id, products]); // Depend on both `id` and `products`

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "categories" || name === "sizes") {
  //     setProduct({ ...product, [name]: value.split(",") }); // Convert CSV to array
  //   } else {
  //     setProduct({ ...product, [name]: value });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedProduct = { ...product, [name]: value };

    // Convert CSV to array for categories and sizes
    if (name === "categories" || name === "sizes") {
      updatedProduct[name] = value.split(",");
    }

    // Validation: Ensure previousPrice is not less than currentPrice
    if (name === "previousPrice" || name === "currentPrice") {
      if (
        updatedProduct.previousPrice &&
        updatedProduct.currentPrice &&
        Number(updatedProduct.previousPrice) <
          Number(updatedProduct.currentPrice)
      ) {
        setvalueError("Previous price cannot be less than the current price.");
      } else {
        setvalueError(null);
      }
    }

    setProduct(updatedProduct);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({
      ...product,
      supplier: { ...product.supplier, [name]: checked },
    });
  };

  const handleBulkPricingChange = (index, field, value) => {
    const updatedBulkPricing = [...product.bulkPricing];
    updatedBulkPricing[index][field] = value;
    setProduct({ ...product, bulkPricing: updatedBulkPricing });
  };

  const addBulkPricing = () => {
    if (product.bulkPricing.length < 3 && isValidBulkPricing()) {
      setProduct({
        ...product,
        bulkPricing: [
          ...product.bulkPricing,
          { minQuantity: "", maxQuantity: "", price: "" },
        ],
      });
    }
  };

  const removeBulkPricing = (index) => {
    const updatedBulkPricing = [...product.bulkPricing];
    updatedBulkPricing.splice(index, 1);
    setProduct({ ...product, bulkPricing: updatedBulkPricing });
  };

  // Validation function
  const isValidBulkPricing = () => {
    return product.bulkPricing.every((tier) => tier.minQuantity && tier.price);
  };

  const handleThumbnailChange = (index, value) => {
    const updatedThumbnails = [...product.thumbnails];
    updatedThumbnails[index] = value;
    setProduct({ ...product, thumbnails: updatedThumbnails });
  };

  const addThumbnail = () => {
    if (product.thumbnails.length < 10 && isValidThumbnail()) {
      setProduct({
        ...product,
        thumbnails: [...product.thumbnails, ""],
      });
    }
  };

  const removeThumbnail = (index) => {
    const updatedThumbnails = [...product.thumbnails];
    updatedThumbnails.splice(index, 1);
    setProduct({ ...product, thumbnails: updatedThumbnails });
  };

  // Validation function: Ensures the last thumbnail input is filled before adding a new one
  const isValidThumbnail = () => {
    return (
      product.thumbnails.length === 0 ||
      product.thumbnails[product.thumbnails.length - 1]
    );
  };

  // const isValidBulkPricing = () => {
  //   return product.bulkPricing.every(
  //     (tier) => tier.minQuantity && tier.maxQuantity && tier.price
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (valueError) {
      return;
    }

    if (!isValidBulkPricing()) {
      setBulkError(true);
      return;
    }
    setBulkError(false);

    setUpdating(true);
    setError(null);

    // console.log(product);

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const res = await axios.put(
        `${API_BASE_URL}/api/products/${id}`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
        }
      );

      if (res.data) {
        // Update the products state in ProductContext
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p._id === id ? res.data : p))
        );
        // console.log(res.data);

        Swal.fire({
          title: "Updated!",
          text: "Product has been updated successfully.",
          icon: "success",
          timer: 1000, // Auto close after 2 seconds
          showConfirmButton: false,
        });

        navigate("/admin"); // Redirect back to admin panel
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center flex-col gap-3 items-center h-[90vh] -translate-y-22">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.5s" }}
        ></div>
      </div>
    );
  }

  if (!product) return <p>Product not found</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-5 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold" htmlFor="name">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded-md"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold" htmlFor="currentPrice">
              Price: (After discount or without discount)
            </label>
            <input
              type="number"
              name="currentPrice"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-md"
              value={product.currentPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold" htmlFor="previousPrice">
              Previous Price: (Leave Empty if no discount)
            </label>
            <input
              type="number"
              name="previousPrice"
              placeholder="Previous Price"
              className="w-full px-4 py-2 border rounded-md"
              value={product.previousPrice ?? ""}
              onChange={handleChange}
            />
          </div>
          {/* Show error message if validation fails */}
          {valueError && (
            <p className="text-red-500 text-sm mt-1">{valueError}</p>
          )}
          <div>
            <label className="block font-semibold" htmlFor="tax">
              Tax:
            </label>
            <input
              type="number"
              name="tax"
              placeholder="Tax"
              className="w-full px-4 py-2 border rounded-md"
              value={product.tax ?? ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold" htmlFor="stock">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              className="w-full px-4 py-2 border rounded-md"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold" htmlFor="image">
              Product Image URL:
            </label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded-md"
              value={product.image}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-semibold" htmlFor="categories">
              Categories: (Separate by comma)
            </label>
            <input
              type="text"
              name="categories"
              placeholder="Categories (comma-separated)"
              className="w-full px-4 py-2 border rounded-md"
              value={product.categories.join(",")}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div>
            <label className="block font-semibold" htmlFor="rating">
              Rating:
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              className="w-full px-4 py-2 border rounded-md"
              value={product.rating}
              onChange={handleChange}
            />
          </div> */}

          {/* <div>
            <label className="block font-semibold" htmlFor="shipping">
              Shipping Details:
            </label>
            <input
              type="text"
              name="shipping"
              placeholder="Shipping Details"
              className="w-full px-4 py-2 border rounded-md"
              value={product.shipping}
              onChange={handleChange}
            />
          </div> */}

          <div>
            <label className="block font-semibold" htmlFor="type">
              Type:
            </label>
            <input
              type="text"
              name="type"
              placeholder="Product Type"
              className="w-full px-4 py-2 border rounded-md"
              value={product.type}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="material">
              Material:
            </label>
            <input
              type="text"
              name="material"
              placeholder="Material"
              className="w-full px-4 py-2 border rounded-md"
              value={product.material}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="sizes">
              Sizes: (Separate by comma)
            </label>
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              className="w-full px-4 py-2 border rounded-md"
              value={product.sizes.join(",")}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="customization">
              Customization:
            </label>
            <input
              type="text"
              name="customization"
              placeholder="Customization"
              className="w-full px-4 py-2 border rounded-md"
              value={product.customization}
              onChange={handleChange}
              required
            />
          </div>

          {/* <input
            type="text"
            name="protection"
            placeholder="Protection Plan"
            className="w-full px-4 py-2 border rounded-md"
            value={product.protection}
            onChange={handleChange}
          /> */}

          <div>
            <label className="block font-semibold" htmlFor="warranty">
              Warranty: (Enter period)
            </label>
            <input
              type="text"
              name="warranty"
              placeholder="Warranty"
              className="w-full px-4 py-2 border rounded-md"
              value={product.warranty}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-md"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-lg font-semibold mt-4">Thumbnails</h3>
          {product.thumbnails.map((thumbnail, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder={`Thumbnail ${index + 1} URL`}
                className="w-full px-4 py-2 border rounded-md"
                value={thumbnail}
                onChange={(e) => handleThumbnailChange(index, e.target.value)}
              />
              <button
                type="button"
                className="px-2 cursor-pointer py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => removeThumbnail(index)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-md"
              onClick={addThumbnail}
              disabled={product.thumbnails.length >= 10 || !isValidThumbnail()}
            >
              + Add Thumbnail
            </button>
          </div>

          <h3 className="text-lg font-semibold mt-4">
            Bulk Pricing{" "}
            <p className="text-sm">(Last tier max quantity can be empty)</p>
          </h3>
          {product.bulkPricing.map((tier, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <input
                type="number"
                placeholder="Min Qty"
                className="w-1/3 px-4 py-2 border rounded-md"
                value={tier.minQuantity}
                onChange={(e) =>
                  handleBulkPricingChange(index, "minQuantity", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Max Qty"
                className="w-1/3 px-4 py-2 border rounded-md"
                value={tier.maxQuantity ?? ""}
                onChange={(e) =>
                  handleBulkPricingChange(index, "maxQuantity", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="w-1/3 px-4 py-2 border rounded-md"
                value={tier.price}
                onChange={(e) =>
                  handleBulkPricingChange(index, "price", e.target.value)
                }
              />
              <button
                type="button"
                className="px-2 py-1 cursor-pointer hover:bg-red-600 bg-red-500 text-white rounded-md"
                onClick={() => removeBulkPricing(index)}
              >
                ✕
              </button>
            </div>
          ))}

          {bulkError && (
            <p className="text-red-500 text-sm mt-2">
              Please fill at least min Quantity and bulk price fields before
              updating.
            </p>
          )}

          <div className="mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-md"
              onClick={addBulkPricing}
              disabled={
                product.bulkPricing.length >= 3 || !isValidBulkPricing()
              }
            >
              + Add Tier
            </button>
          </div>

          <h3 className="text-lg font-semibold mt-4">Supplier Info</h3>

          {/* <div>
            <label className="block font-semibold" htmlFor="supplier.name">
              Supplier Name:
            </label>
            <input
              type="text"
              name="supplier.name"
              placeholder="Supplier Name"
              className="w-full px-4 py-2 border rounded-md"
              value={product.supplier.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  supplier: { ...product.supplier, name: e.target.value },
                })
              }
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="supplier.location">
              Supplier Location:
            </label>
            <input
              type="text"
              name="supplier.location"
              placeholder="Supplier Location"
              className="w-full px-4 py-2 border rounded-md"
              value={product.supplier.location}
              onChange={(e) =>
                setProduct({
                  ...product,
                  supplier: { ...product.supplier, location: e.target.value },
                })
              }
            />
          </div> */}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="verified"
              checked={product.supplier.verified}
              onChange={handleCheckboxChange}
            />
            <span>Verified Supplier</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="worldwideShipping"
              checked={product.supplier.worldwideShipping}
              onChange={handleCheckboxChange}
            />
            <span>Worldwide Shipping</span>
          </label>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
