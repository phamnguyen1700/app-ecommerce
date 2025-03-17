import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRecommendedProducts = createAsyncThunk(
  'product/getRecommendedProducts',
  async (skinType: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/recommended?skinType=${skinType}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
); 