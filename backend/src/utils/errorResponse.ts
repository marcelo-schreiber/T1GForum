export default {
  handleServerError(req, res) {
    return res.status(500).json("Server error");
  },

  handleNotFound(req, res) {
    return res.status(404).json("URL not found");
  },
};
