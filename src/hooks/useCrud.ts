import { useEffect, useState } from "react";
import { api } from "../api";

export function useCrud<T>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint, { params: { page: 0, size: 6 } });
      setItems(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: Partial<T>) => {
    const res = await api.post(endpoint, data);
    setItems((prev) => [...prev, res.data]);
  };

  const update = async (id: string, data: Partial<T>) => {
    const res = await api.put(`${endpoint}/${id}`, data);
    setItems((prev) =>
      prev.map((item: any) => (item.id === id ? res.data : item))
    );
  };

  const remove = async (id: string) => {
    await api.delete(`${endpoint}/${id}`);
    setItems((prev) => prev.filter((item: any) => item.id !== id));
  };

  useEffect(() => {
    fetchAll();
  }, [endpoint]);

  return { items, loading, error, create, update, remove };
}
