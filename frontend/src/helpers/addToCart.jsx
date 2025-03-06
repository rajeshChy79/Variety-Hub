import { toast } from "react-toastify";
import SummaryApi from "../../common";

const addToCart=async(e,id)=>{
  e?.stopPropagation();
  e?.preventDefault();

  const dataResponse=await fetch(SummaryApi.addToCartProduct.url,{
    method:SummaryApi.addToCartProduct.method,
    headers:{
      "content-type":"application/json"
    },
    credentials:'include',
    body:JSON.stringify({
      productId:id
    })
  })

  const dataApi=await dataResponse.json();
  if(dataApi.success){
    toast.success(dataApi.message);
  }
  if(dataApi.error){
    toast.error(dataApi.message)
  }
}
export default addToCart