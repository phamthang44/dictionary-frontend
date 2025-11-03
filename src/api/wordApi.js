import api from "./axios";

export const wordApi = {
  getAll: (params) => api.get("/words", { params }),
  getById: (id) => api.get(`/words/${id}`),
  create: (data) => api.post("/words", data),
  update: (id, data) => api.put(`/words/${id}`, data),
  delete: (id) => api.delete(`/words/${id}`),
};
