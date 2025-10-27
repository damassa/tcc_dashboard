// src/api/CategoryService.ts
import { api } from "./api"; // seu axios configurado
import { CategoryResponse } from "../types/category";

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const res = await api.get("/api/v1/categories");
  return res.data;
};

export const createCategory = async (
  name: string
): Promise<CategoryResponse> => {
  try {
    console.log(api);
    const res = await api.post("/api/v1/categories", name);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  name: string
): Promise<CategoryResponse> => {
  const res = await api.put(`/api/v1/categories/${id}`);
  return res.data;
};

export const getCategoryById = async (
  id: number
): Promise<CategoryResponse> => {
  const res = await api.get(`/api/v1/categories/${id}`);
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await api.delete(`/api/v1/categories/${id}`);
  return res.data;
};
