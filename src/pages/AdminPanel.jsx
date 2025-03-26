import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const AdminPanel = () => {
  const { products, setProducts, loading } = useContext(ProductContext);
  //   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, authLoading } = useContext(AuthContext);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const { fetchCartItems } = useCart();

  // Redirect if not an admin
  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      Swal.fire("Access Denied", "Admins only!", "error");
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  // Delete product function
  const deleteProduct = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
      fetchCartItems();
      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
        timer: 1000, // Auto close after 2 seconds
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex w-full justify-center flex-col gap-3 items-center h-[90vh] -translate-y-22">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.5s" }}
        ></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <Link
        to="/admin/add-product"
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add New Product
      </Link>

      {/* Table Design to display products */}
      {/* <table className="w-full max-w-4xl bg-white shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center border-b">
              <td className="py-2 px-4">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              </td>
              <td className="py-2 px-4">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </td>
              <td className="py-2 px-4">
                ${product.currentPrice}{" "}
                {product.previousPrice > 0 && (
                  <span className="ml-1 text-gray-500 line-through">
                    ${product.previousPrice.toFixed(2)}
                  </span>
                )}
              </td>
              <td className="py-2 px-4">
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Grid Design to display products */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-102"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  className="aspect-square w-full object-cover rounded-md mb-3"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <h3 className="text-lg font-semibold text-center">
                <Link
                  to={`/product/${product._id}`}
                  className="hover:text-blue-600"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="text-gray-700 mt-1">
                ${product.currentPrice}{" "}
                {product.previousPrice > 0 && (
                  <span className="ml-1 text-gray-500 line-through text-sm">
                    ${product.previousPrice.toFixed(2)}
                  </span>
                )}
              </p>
              <div className="flex gap-2 mt-auto pt-1">
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="px-3 py-1 font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="px-3 py-1 font-semibold cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
