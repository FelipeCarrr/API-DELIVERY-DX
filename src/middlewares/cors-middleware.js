import cors from "cors";

const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const Accepted_origins = [
        "http://localhost",
        "http://localhost:5173",
        "http://localhost:8081",
        "https://proyecto-integrador-front-exzfy8t7i-brav2001s-projects.vercel.app",
        "https://proyecto-integrador-front.vercel.app",
      ];

      if (Accepted_origins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });

export default corsMiddleware;

