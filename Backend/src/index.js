import express from 'express';
import authRoutes from './routes/auth.route.js';
const app = express();
const port = 5022;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});