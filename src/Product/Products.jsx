import React from 'react'
import { createContext, useState,useEffect } from 'react';
import axios from "axios";
import { Card, Form, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useContext } from 'react';
import { productlist } from '../App';
import { useNavigate ,useSearchParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Products = () => {
    const {product, setcardId} = useContext(productlist)
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(product)
    const [sortOption, setSortOption] = useState("");    // State to manage sort option
     const [currentPage, setCurrentPage] = useState(1);    // State to manage pagination 

     // Extract search and category from query parameters
     const searchQuery = searchParams.get("search") || "";
     const selectedCategory = searchParams.get("category") || "";
     
     //set  id of seleced product
      const get_id= (id)=>
       { setcardId(id);}

      

      // Update query parameters for filters
       const handleFilter = (category) => {
        const newParams = { search: searchQuery }; // Preserve the search query
        if (category) newParams.category = category;
           setSearchParams(newParams);
       };

      // Update query parameters for search
        const handleSearch = (e) => {
          const search = e.target.value;
          const newParams = { category: selectedCategory }; // Preserve the category
          if (search) newParams.search = search;
          setSearchParams(newParams);
        };
      // Filter products based on the selected category and search term
        const filteredProducts = (product || []).filter((item) => {
          const title = item?.title || "";
          const matchesCategory = selectedCategory? item?.category === selectedCategory: true;
          const matchesSearch = searchQuery? title.toLowerCase().includes(searchQuery.toLowerCase()): true;
          return matchesCategory && matchesSearch;
        });
        // Sorting logic
        const sortedProducts = filteredProducts.sort((a, b) => {
          if (sortOption === "priceLowToHigh") {
          return a.price - b.price; // Sort by price (low to high)
          } else if (sortOption === "priceHighToLow") {
          return b.price - a.price; // Sort by price (high to low)
          }  else if (sortOption === "rating") {
            return b.rating - a.rating; // Sort by rating (high to low)
          }
          return 0; // Default: no sorting
        });
      // Pagination States
         const itemsPerPage = 6;  // Number of items per page
         const LastProduct = currentPage * itemsPerPage;
         const FirstProduct = LastProduct - itemsPerPage;
         const currentProducts = sortedProducts.slice(FirstProduct, LastProduct);

      // Handle Page Change
         const handlePage = (pageNumber) => {
           setCurrentPage(pageNumber);
         };
      return (
      <div>
          <div className='header'>
            <h1 className='title'>Shopy</h1>  

              {/* Search Bar */}
              <InputGroup style={{ width: "300px", height:"19px"}}>
              <Form.Control placeholder="Search here..." value={searchQuery} onChange={handleSearch}  />
              </InputGroup>
              {/* Dropdown Menu for filtering by category */}
              <DropdownButton id="dropdown-category" title={selectedCategory || "Filter by Category"}
              onSelect={(e) => handleFilter(e)} variant="light" >

              <Dropdown.Item eventKey="">All Categories</Dropdown.Item>
              <Dropdown.Item eventKey="beauty">Beauty</Dropdown.Item>
              <Dropdown.Item eventKey="fragrances">Fragrances</Dropdown.Item>
              <Dropdown.Item eventKey="furniture">Furniture</Dropdown.Item>
              <Dropdown.Item eventKey="groceries">Groceries</Dropdown.Item>
              </DropdownButton>

              {/* Dropdown Menu for Sorting */}
              <DropdownButton id="dropdown-sort" title={sortOption || "Sort By"}  onSelect={(e) => setSortOption(e)} variant="light" >
              <Dropdown.Item eventKey="priceLowToHigh">Price: Low to High</Dropdown.Item>
              <Dropdown.Item eventKey="priceHighToLow">Price: High to Low</Dropdown.Item>
              <Dropdown.Item eventKey="rating">Rating: High to Low</Dropdown.Item>
              </DropdownButton>
              </div>

              {/* map filtered products */}
              <div className='grid' >
                {currentProducts.length > 0 ? (
                currentProducts.map((obj) => (
                <Card className='card' key={obj.id} onClick={()=>{get_id(obj.id)}}  >
                  <Link to="/productdetails" style={{textDecoration:"none"}}>
                   <Card.Img variant="top" src={obj.images} style={{ height: "200px" }} />
                   <Card.Body>
                     <Card.Title>
                      <strong style={{ color: "#520785"}}> {obj.title || "N/A"}</strong>
                     </Card.Title>
                     <Card.Title>
                      <strong style={{ color: "green" }}>{obj.discountPercentage || "N/A"}% Off</strong> 
                     </Card.Title>
                     <Card.Title style={{ display: "none" }}>
                      <strong style={{ color: "black" }}>{obj.category || "N/A"}</strong> 
                     </Card.Title>
                     <Card.Title>
                      <strong style={{ color: "black" }}>${obj.price || "N/A"}</strong> 
                      </Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
          {/* Pagination Controls */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className='page_button' onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>&lt;&lt;&lt;&lt;</button>
            <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
            <button className='page_button' onClick={() => handlePage(currentPage + 1)} disabled={currentPage * itemsPerPage >= sortedProducts.length}>&gt;&gt;&gt;&gt;</button>
          </div>
       </div>
  );
};

export default Products