import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCategory from "../../helpers/ProductCategory";
import CategoryWiseProductList from "../../components/product/CategoryWiseProductDisplayForList";
import SummaryApi from "../../../common";
import { toast } from "react-toastify"; // Ensure you import this for notifications

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch filtered products");
      const dataResponse = await response.json();
      console.log("dataResponse", dataResponse);
      setData(dataResponse?.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { name, checked, value } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryName) =>
        selectCategory[categoryName] ? categoryName : null
      )
      .filter(Boolean);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/category-product?" + urlFormat.join(""));
  }, [selectCategory, navigate]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setData((prev) =>
      [...prev].sort((a, b) =>
        value === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    );
  };

  useEffect(() => {}, [sortBy]); // No-op effect can be removed if not needed

  return (
    <div className="container mx-auto p-4 pt-[60px] bg-[#EBF4F6] min-h-screen pb-20">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px_1fr] gap-4">
        {/* Left Side (Filters and Sorting) */}
        <div className="bg-white p-3 sm:p-4 min-h-[calc(100vh-120px)] rounded-xl shadow-md border border-[#071952] border-opacity-20">
          {/* Sort By */}
          <div className="text-lg">
            <h3 className="text-lg sm:text-xl uppercase font-medium text-[#071952] opacity-80 border-b pb-1 sm:pb-2 border-[#071952] border-opacity-20">
              Sort By
            </h3>
            <form className="text-sm sm:text-base flex flex-col gap-2 py-2 sm:py-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortby"
                  checked={sortBy === "asc"}
                  value="asc"
                  onChange={handleOnChangeSortBy}
                  className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
                />
                <label className="text-[#071952] opacity-80">
                  Price - Low to High
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortby"
                  checked={sortBy === "dsc"}
                  value="dsc"
                  onChange={handleOnChangeSortBy}
                  className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
                />
                <label className="text-[#071952] opacity-80">
                  Price - High to Low
                </label>
              </div>
            </form>
          </div>

          {/* Filter By (Category) */}
          <div className="text-lg mt-4 sm:mt-6">
            <h3 className="text-lg sm:text-xl uppercase font-medium text-[#071952] opacity-80 border-b pb-1 sm:pb-2 border-[#071952] border-opacity-20">
              Category
            </h3>
            <form className="text-sm sm:text-base flex flex-col gap-2 py-2 sm:py-3">
              {ProductCategory.map((category, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    value={category?.value}
                    id={category?.value}
                    checked={selectCategory[category?.value] || false}
                    onChange={handleSelectCategory}
                    className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
                  />
                  <label
                    htmlFor={category?.value}
                    className="text-[#071952] opacity-80"
                  >
                    {category?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side (Product List) */}
        <div>
          <p className="text-lg sm:text-xl font-medium text-[#071952] mb-2 sm:mb-3">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hide no-scrollbar">
            {data.length !== 0 && !loading && (
              <CategoryWiseProductList
                data={data}
                loading={loading}
                heading={"Recommended"}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version (Simplified, assuming similar functionality) */}
      <div className="lg:hidden">
        <h2 className="text-2xl font-bold text-[#071952] mb-2 sm:mb-3">
          Filters & Products
        </h2>
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-[#071952] border-opacity-20 mb-2 sm:mb-3">
          {/* Sort By (Mobile) */}
          <h3 className="text-lg sm:text-xl uppercase font-medium text-[#071952] opacity-80 border-b pb-1 sm:pb-2 border-[#071952] border-opacity-20">
            Sort By
          </h3>
          <form className="text-sm sm:text-base flex flex-col gap-2 py-2 sm:py-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortby_mobile"
                checked={sortBy === "asc"}
                value="asc"
                onChange={handleOnChangeSortBy}
                className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
              />
              <label className="text-[#071952] opacity-80">
                Price - Low to High
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortby_mobile"
                checked={sortBy === "dsc"}
                value="dsc"
                onChange={handleOnChangeSortBy}
                className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
              />
              <label className="text-[#071952] opacity-80">
                Price - High to Low
              </label>
            </div>
          </form>

          {/* Filter By (Category) - Mobile */}
          <h3 className="text-lg sm:text-xl uppercase font-medium text-[#071952] opacity-80 border-b pb-1 sm:pb-2 border-[#071952] border-opacity-20 mt-4 sm:mt-6">
            Category
          </h3>
          <form className="text-sm sm:text-base flex flex-col gap-2 py-2 sm:py-3">
            {ProductCategory.map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="category_mobile"
                  value={category?.value}
                  id={category?.value}
                  checked={selectCategory[category?.value] || false}
                  onChange={handleSelectCategory}
                  className="text-[#1E88E5] focus:ring-[#1E88E5] transition-colors duration-200"
                />
                <label
                  htmlFor={category?.value}
                  className="text-[#071952] opacity-80"
                >
                  {category?.label}
                </label>
              </div>
            ))}
          </form>
        </div>

        <p className="text-lg sm:text-xl font-medium text-[#071952] mb-2 sm:mb-3">
          Search Results: {data.length}
        </p>
        <div className="overflow-y-auto max-h-[calc(100vh-300px] scrollbar-hide">
          {data.length !== 0 && !loading && (
            <CategoryWiseProductList
              data={data}
              loading={loading}
              heading={"Recommended"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;