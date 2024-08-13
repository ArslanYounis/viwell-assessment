import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from 'config';
import { uniqBy } from 'lodash';
import { IProductType, PagedProductApiResponse } from 'types/product.types';

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig<unknown>, unknown, AxiosError> =>
  async ({ url, method, data, params }) => {
    try {
      Axios.defaults.baseURL = API_BASE_URL;
      const result = await Axios({
        url,
        method,
        data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };

interface IPaginationParams {
  limit?: number;
  skip?: number;
}

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getProducts: builder.query<PagedProductApiResponse, IPaginationParams>({
      query: ({ limit = 20, skip = 0 }) => ({
        url: '/products',
        method: 'GET',
        params: { limit, skip },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        const newList = uniqBy(
          [...currentCache.products, ...newItems.products],
          'id'
        );
        currentCache.products = newList;
        currentCache.skip = newItems.skip;
        currentCache.limit = newItems.limit;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getProductById: builder.query<IProductType, number>({
      query: id => ({ url: `/products/${id}`, method: 'GET' }),
    }),
  }),
  reducerPath: 'apiService',
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiService;

export default apiService;
