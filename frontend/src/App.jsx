import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
 const [cursor, setCursor] = useState(null);
  const [productId, setProductId] = useState(null);

 function buildUrl({ category, cursor, productId }) {
  let url = API_URL;

  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  if (cursor && productId) {
    params.append("cursor", cursor);
    params.append("productId", productId);
  }

  return `${url}?${params.toString()}`;
}

  const fetchProducts = async () => {
setLoading(true);
    try {
      let url = buildUrl({
  category,
  cursor,
  productId,
});
      const res = await fetch(url);
      if(!res.ok){
        throw new Error("failed to fetch Products");
      }
      console.log(res);
      const data = await res.json();
      console.log(data.NextCursor);
      console.log("Current Cursor:", cursor);
console.log("Current ProductId:", productId);
console.log("Request URL:", url);
      setCursor(data.NextCursor?.cursor);
      setProductId(data.NextCursor?.productId);
      setProducts((prev) => [...prev, ...data.products]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

 const resetPagination = () => {
  setProductId(null);
  setCursor(null);
  setProducts([]);
 }

 const handleCategoryChange=(e)=>{
  resetPagination();
  setCategory(e.target.value);
 }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>Products Browser</h1>

      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
        <option value="Sports">Sports</option>
        <option value="Home">Home</option>
      </select>

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {products?.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>₹{product.price}</p>
            <small>{new Date(product.updatedAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
<button onClick={fetchProducts} disabled={loading}>
  {loading ? "Loading...":"Load More"}
</button>
    </div>
  );
}

export default App;


