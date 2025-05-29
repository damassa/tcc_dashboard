import { api } from "../api";

export const getSeries = async (page = 0, size = 6) => {
  const res = await api.get("/api/v1/series/pageable", {
    params: { page, size },
  });
  return {
    data: res.data.content || [],
    total: res.data.totalElements || 0,
  };
};
