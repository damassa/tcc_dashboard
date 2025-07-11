// src/api/CategoryService.ts
import { api } from "./api"; // seu axios configurado
import { CategoryResponse } from "../types/category";

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const res = await api.get("/api/v1/categories");
  return res.data;
};

export async function createCategory(data: { name: string }) {
  const res = await fetch("/api/v1/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar categoria");
  return res.json();
}

export async function updateCategory(id: number, data: { name: string }) {
  const res = await fetch(`/api/v1/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar categoria");
  return res.json();
}

export const deleteCategory = async (id: number) => {
  const res = await api.delete(`/api/v1/categories/${id}`);
  return res.data;
};
