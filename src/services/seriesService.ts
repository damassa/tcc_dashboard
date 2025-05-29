import { api } from "../api";

export const getSeries = async (page: number, limit: number) => {
  const res = await api.get(`/series/pageable`, {
    params: {
      page: page - 1,
      size: limit,
    },
  });

  return {
    data: res.data.content || [],
    total: res.data.totalElements || 0,
  };
};
