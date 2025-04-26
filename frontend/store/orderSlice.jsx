import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SummaryApi from "../common";

//Fetch orders asynchronously
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch(SummaryApi.order.url, {
    method: SummaryApi.order.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  if (!data.success) throw new Error(data.message || "Failed to fetch orders");

  return data.orders; //Return fetched orders
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {}, //No additional reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
