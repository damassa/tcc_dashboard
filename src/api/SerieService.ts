import api from "./api";
import type { SerieResponse } from "../types/serie";

export const getAllSeries = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get("/api/v1/series", {});
    const series = response.data;
    return series;
  } catch (error) {
    console.error(error);
  }
  return [];
};

// Busca todas as séries ordenadas por ano (da mais recente até a mais antiga)
export const getSeriesOrderedByYear = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get("/api/v1/series", {});
    const series = response.data;
    const orderedSeries = series.sort(
      (a: { year: number }, b: { year: number }) => b.year - a.year
    );
    return orderedSeries;
  } catch (error) {
    console.error(error);
  }
  return [];
};

// Busca uma série pelo identificador (específico para detalhe da série)
export const getSerieById = async (id: number): Promise<SerieResponse> => {
  const response = await api
    .get<SerieResponse>(`/api/v1/series/${id}`, {})
    .catch((error) => {
      console.error(error);
      throw error;
    });

  return response.data;
};

export const createSerie = async (data: Omit<SerieResponse, "id">) => {
  return await api.post("/api/v1/series", data);
};

export const updateSerie = async (
  id: number,
  data: Omit<SerieResponse, "id">
) => {
  return await api.put(`/api/v1/series/${id}`, data);
};

export const deleteSerie = async (id: number) => {
  try {
    await api.delete(`/api/v1/series/${id}`);
  } catch (error) {
    console.error(error);
  }
};
