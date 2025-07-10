// src/api/CategoryService.ts
import { api } from "./api"; // seu axios configurado
import { CategoryResponse } from "../types/category";

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const res = await api.get("/api/v1/categories");
  return res.data;
};
