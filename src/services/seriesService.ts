export const getSeries = async (page: number, limit: number) => {
  const url = `${import.meta.env.VITE_API_URL}/series?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar séries");
  }
  const json = await res.json();
  return {
    data: json.series || [],
    total: json.totalCount || 0,
  };
};