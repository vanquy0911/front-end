import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    type: "",
    category: "",
    rating: "",
    countInStock: "",
    description: "",
    image: null, // Thêm ảnh cho sản phẩm mới
  });

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("Dữ liệu sản phẩm nhận được: ", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm: ", error);
      });
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  // Hàm xử lý sự kiện thay đổi thông tin sản phẩm mới
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Hàm xử lý thay đổi tệp ảnh
  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Hàm tạo sản phẩm mới
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("type", newProduct.type);
    formData.append("category", newProduct.category);
    formData.append("rating", newProduct.rating);
    formData.append("countInStock", newProduct.countInStock);
    formData.append("description", newProduct.description);
    if (newProduct.image) formData.append("image", newProduct.image); // Thêm ảnh vào formData

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setProducts([...products, response.data.product]); // Cập nhật sản phẩm mới vào danh sách
      setNewProduct({
        name: "",
        price: "",
        type: "",
        category: "",
        rating: "",
        countInStock: "",
        description: "",
        image: null,
      }); // Reset form
    } catch (error) {
      console.error("Có lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}

      {/* Form tạo sản phẩm mới */}
      <h3>Create New Product</h3>
      <form onSubmit={handleCreateProduct}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={newProduct.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={newProduct.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock Count:</label>
          <input
            type="number"
            name="countInStock"
            value={newProduct.countInStock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default ProductList;
