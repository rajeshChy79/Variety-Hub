import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../../common";
import DisplaySearchProduct from "../components/DisplaySearchProduct"; //  Import Display Component

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation();

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      method: SummaryApi.searchProduct.method,
    });

    const dataResponse = await response.json();
    setLoading(false);
    setData(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 py-4">Search Results</h2>

      {loading && <p className="text-lg text-center">Loading...</p>}
      {!loading && data.length === 0 && (
        <p className="text-lg bg-white p-4 text-center">No Data Found</p>
      )}

      {/* Pass Data to DisplaySearchProduct */}
      <DisplaySearchProduct loading={loading} data={data} />
    </div>
  );
};

export default SearchProduct;
