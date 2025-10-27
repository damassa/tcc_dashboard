import api from "./api";
import type { SerieResponse } from "../types/serie";

export const getAllSeries = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get("/api/v1/series");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSeriesOrderedByYear = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get("/api/v1/series?sort=year,desc");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSerieById = async (id: number): Promise<SerieResponse> => {
  const response = await api.get<SerieResponse>(`/api/v1/series/${id}`);
  return response.data;
};

export const createSerie = async (data: SerieResponse) => {
  return await api.post("/api/v1/series", data);
};

export const updateSerie = async (id: number, data: SerieResponse) => {
  return await api.patch(`/api/v1/series/${id}`, data);
};

export const deleteSerie = async (id: number) => {
  try {
    await api.delete(`/api/v1/series/${id}`);
  } catch (error) {
    console.error(error);
  }
};
