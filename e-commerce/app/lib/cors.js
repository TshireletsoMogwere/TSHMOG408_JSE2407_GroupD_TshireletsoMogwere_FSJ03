import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
  origin: "http://localhost:3000",
});

// Helper method to wait for a middleware to execute before continuing
function runCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default runCors;
