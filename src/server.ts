import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

const PORT = ENV.PORT;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();
