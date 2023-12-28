import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateProduct, Product } from 'types/product.type'
import { Status } from 'types/status.type'
import http from 'utils/http'
import { EdittingProduct } from '../../types/product.type'
import { Category } from 'types/category.type'
import { Cart, CartPayment, ShowCart } from 'types/cart.type'
import { User, UserPayment } from 'types/auth.type'

export const getProductList = createAsyncThunk('product/getProductList', async (_, thunkAPI) => {
  const response = await http.get<{ status: string; product: Product[] }>('product/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const addProduct = createAsyncThunk('product/addProduct', async (data: any, thunkAPI) => {
  try {
    const response = await http<{ status: Status; product: Product }>({
      url: 'product/add-product',
      method: 'POST',
      data: data, // Không thực hiện chuyển đổi kiểu dữ liệu ở đây
      headers: { 'Content-Type': 'multipart/form-data' },
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }

  // Convert dữ liệu ra json

  // Nếu bị lỗi thì reject
  /* if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(jsonData)
  } */

  // Còn không thì trả về dữ liệu
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId: number, thunkAPI) => {
  try {
    const response = await http.delete<Status>(`product/delete/${productId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const showIdProduct = createAsyncThunk('product/showIdProduct', async (productId: number, thunkAPI) => {
  try {
    const response = await http.get<{ status: Status; product: EdittingProduct }>(`product/showById/${productId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ product, productId }: { product: any; productId: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status; product: EdittingProduct }>({
        url: `product/update-product/${productId}`,
        method: 'PATCH',
        data: product,
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: thunkAPI.signal
      })
      console.log(response)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateStatusProduct = createAsyncThunk(
  'product/updateStatusProduct',
  async ({ status, productId }: { status: any; productId: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `product/update-status/${productId}`,
        method: 'PATCH',
        data: { status },
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const searchProduct = createAsyncThunk('product/searchProduct', async (name: string, thunkAPI) => {
  try {
    const response = await http<{ product: Product[] }>({
      url: `product/search`,
      method: 'PATCH',
      data: { name },
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getProductListByProductGroupId = createAsyncThunk(
  'product/getProductListByProductGroupId',
  async (productGroupId: number, thunkAPI) => {
    const response = await http.get<{ status: Status; product: Product[] }>(
      `/product/product-group/${productGroupId}`,
      {
        signal: thunkAPI.signal
      }
    )
    console.log(response.data)
    return response.data
  }
)
