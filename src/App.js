import logo from './logo.svg';
import './App.css';
import { createContext, useState,useEffect } from 'react';
import axios from "axios";
import Products from './Product/Products';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import ProductDetails from './Product/ProductDetails';
 
const productlist=createContext()

function App() {
  const [product, setproduct] = useState([]);
  const [cardId, setcardId] = useState([])
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error

    axios.get("https://dummyjson.com/products")
      .then((res) => {
        setproduct(res.data.products); // Update products
        setIsLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later."); // Set error message
        setIsLoading(false); // Stop loading
      });
   }, []);

  return (
    <div>
      <productlist.Provider value={{ product, setproduct, cardId, setcardId,isLoading, setIsLoading ,error, setError}}>
        <BrowserRouter>
          {/* Define your app routes here */}
          <Routes>
            <Route  path="/"  element={isLoading ? (
                  <p>Loading products...</p>
                  ) : error ? (
                  <p style={{ color: "red" }}>{error}</p>
                  ) : (
                   <Products />
                  )
              }
            />
            <Route path="/productdetails" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </productlist.Provider>
    </div>
  );
}
export default App;
export {productlist}