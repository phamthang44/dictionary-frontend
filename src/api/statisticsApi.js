import api from "./axios";

const statisticsApi = {
  getStats() {
    return api.get("/statistics");
  },
};

export default statisticsApi;
