import React from 'react'
import { useContext,useEffect,useState} from 'react';
import { productlist } from '../App';

const ProductDetails = () => {
  const {product,cardId,isLoading, setIsLoading ,error, setError} = useContext(productlist)
  // console.log(product);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // useEffect to handle product selection and fetch product details based on cardId
  useEffect(() => {
    if (cardId) {
      setIsLoading(true);
      setError(null);
      // Find the product matching the selected card ID
      const productDetail = product.find((p) => p.id === cardId);
      if (productDetail) {
        // If product is found, set it as the selected product
        setSelectedProduct(productDetail);
        setIsLoading(false);
      } else {
        // If product is not found, set an error message
        setError("Product not found.");
        setIsLoading(false);
      }
    } else {
      // If no product is selected, set an appropriate error message
      setError("No product selected.");
      setIsLoading(false);
    }
  }, [cardId, product]);// Run this effect whenever cardId or product changes

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
    return (
      <div style={{textAlign: "center", backgroundColor: "#ffffed"}}>
        {selectedProduct ? (
          <div className='main_div'>
            {/* Left Section (image) */}
            <div className='left' >
            <img
                 src={selectedProduct.images || "placeholder.jpg"} // Provide a fallback image
                 alt={selectedProduct.brand || "Unknown Brand"}
                style={{ width: "300px",   borderStyle:"inset" 
            }} />
            <button style={{color:'#6f195e',backgroundColor:"white", padding:" 8px 25px",marginTop:"15px"}}>Add To Cart</button>
            <button style={{backgroundColor:'#6f195e',color:"white", padding:" 8px 25px",marginTop:"15px",marginLeft:"10px"}}>Buy Now</button>
          </div>
  
            {/* Right Section (Brand, Category, Price, Rating,Description....) */}
            <div className='right'>
              <p style={{ border: "1px solid #e0dfdc",paddingLeft: "20px"}}>
               <h2 style={{color:"#6f195e"}}><strong>{selectedProduct.title}</strong></h2>
               <p><strong>Price:</strong> ${selectedProduct.price || "N/A"}</p>
              </p>
              <p style={{ border: "1px solid #e0dfdc",paddingLeft: "20px"}}>
                <h5>Product Details</h5>
                <h1><strong>Brand : </strong>{selectedProduct.brand || "Unknown"}</h1>
                <h1><strong>Category : </strong>{selectedProduct.category|| "Unknown"}</h1>
                <h1><strong>Rating : </strong> {selectedProduct.rating || "N/A"}</h1>
                <h1><strong>Warranty : </strong>{selectedProduct.warrantyInformation|| "Unknown"}</h1>
                <h1><strong>Shipping Information : </strong>{selectedProduct.shippingInformation || "Unknown"}</h1>
                <h1><strong>Description : </strong>{" "}{selectedProduct.description || "No description available."}</h1>
              </p>
            </div>
          </div>
        ) : (
          <p>No product found</p> // If no product is found for the selected ID
        )}
      </div>
    );
  };

export default ProductDetails