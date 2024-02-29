import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Pagination from "./Pagination";

export const View = () => {
  //get table tableData
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(0);
  const [limit, setLimit] = useState({
    limitation:5
  });
  let [totalCount,setTotal] = useState();

productsPerPage = limit.limitation
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [formData, setFormData] = useState({
    color: [],
    size: [],
    city: [],
  });

  const { color, size, city } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //Get product data from the database
  let [counter, setCounter] = useState(1);
  const nextPage = (e) => {
    counter++
    setCounter(counter);
    fetchProducts(counter, limit.limitation);
  };

  /***Next and Previous Page Management */
  const previousPage = (e) => {
    counter--;
    setCounter(counter);
    fetchProducts(counter, limit.limitation);
  };

  /*********Set table maximum limit*********/
  const { limitation } = limit;
  const setLimitation = (e) => {
    setLimit({ ...limit, [e.target.name]: e.target.value });
    productsPerPage = limit.limitation
    fetchProducts(counter, limit.limitation);
  };

  let applyFilter = (e) => {
    fetchProducts(counter, limit.limitation);
  }
  let fetchProducts = async (currPage, limit) => {
    setLoading(true);
    const res = await axios.get(
      process.env.REACT_APP_API_SERVER +
        `api/v1/product?page=${currPage}&limit=${limit}`
    );
    setProducts(res.data.data);
    setTotal(res.data.totalProducts);  
    setLoading(false);
  };

  let maxLimit = Math.ceil(totalCount / limit.limitation);

  useEffect(() => {
    fetchProducts(counter,limit.limitation);
  }, []);



  //function to create product object
  function prodObj(c, s, l) {
    return { color: c, size: s, city: l };
  }

  //Submit Form Data on click
  const onSubmit = async (e) => {
    e.preventDefault();
    let colorList, sizeList, cityList;

    if (formData.color) {
      colorList = formData.color;
    }
    if (formData.size) {
      sizeList = formData.size;
    }
    if (formData.city) {
      cityList = formData.city;
    }

    try {
      setLoading(true);
      /************Converting comma separated inputs to an array *********/
      const colors = colorList.split(",");
      const sizes = sizeList.split(",");
      const cities = cityList.split(",");

      const inputArray = [colors, sizes, cities];

      var finalData = [];

      for (var i = 0; i < inputArray[0].length; i++) {
        //loop 1 for item at zeroth position of array i.e inputArray
        for (var j = 0; j < inputArray[1].length; j++) {
          //loop 2 for item at first position of array i.e inputArray
          for (var k = 0; k < inputArray[2].length; k++) {
            //loop 1 for item at second position of array i.e inputArray
            var prod = prodObj(
              inputArray[0][i],
              inputArray[1][j],
              inputArray[2][k]
            );
            finalData.push(prod);
          }
        }
      }

      /**********API Call To Add Product data*********/
      const addCombination = await axios.post(
        process.env.REACT_APP_API_SERVER + "api/v1/product",
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(addCombination.data.data); //set table data and send it to Table view
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="main">
        <h1>Product Form</h1>
        <select name="limitation" value={limitation} onChange={setLimitation}>
          <option >5</option>
          <option >10</option>
        </select> <button onClick={applyFilter} style={{ display: (productsPerPage>5 ? 'inline' : 'none') }}>Apply</button>
        <form onSubmit={onSubmit}>
          <div className="cloth-color">
            <input
              type="text"
              className="insert-color common"
              name="color"
              value={color}
              onChange={onChange}
              placeholder="COLOR"
            />
          </div>
          <div className="cloth-size">
            <input
              type="text"
              className="insert-size common"
              name="size"
              value={size}
              onChange={onChange}
              placeholder="SIZE"
            />
          </div>
          <div className="shipment-city">
            <input
              type="text"
              className="insert-city common"
              name="city"
              value={city}
              onChange={onChange}
              placeholder="CITY"
            />
          </div>
          <div className="generate">
            <input
              type="submit"
              value="submit"
              className="submit-button submit-btn"
            />
          </div>
        </form>
        <Table products={currentProducts} loading={loading} />
        <div  className="container mt-5">
          <button style={{ display: (counter>1 ? 'inline' : 'none') }} onClick={previousPage} className = "page-button">PREVIOUS</button>
          <span className="counter-span">{counter}</span>
          <button style={{ display: ( counter===1 || counter<maxLimit ? 'inline' : 'none') }} onClick={nextPage} className = "page-button">NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default View;
