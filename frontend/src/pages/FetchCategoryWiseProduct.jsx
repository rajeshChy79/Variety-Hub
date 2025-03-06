import React from 'react'
import SummaryApi from '../../common'

const FetchCategoryWiseProduct = async(category) => {
  console.log(SummaryApi.categoryWiseProducts.url)
   const dataResponse=await fetch(SummaryApi.categoryWiseProducts.url,{
    method:SummaryApi.categoryWiseProducts.method,
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({category})
   });

   const dataApi=await dataResponse.json();
   return dataApi;
}

export default FetchCategoryWiseProduct
