import api from "./axios";

export const categoryApi = {
  getAll(params) {
    return api.get("/categories/all", { params }); // ?page=1&limit=10&query=hello
  },

  getAllByPagination(params) {
    return api.get("/categories", { params });
  },

  getById(id) {
    return api.get(`/categories/${id}`);
  },
  create(data) {
    if (data && !data._id) {
      delete data._id;
    }
    return api.post("/categories", data);
  },
  update(id, data) {
    return api.put(`/categories/${id}`, data);
  },
  delete(id) {
    return api.delete(`/categories/${id}`);
  },
};
