import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const bootstrap = async () => {
  await connectDB();
  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Backend running on port ${env.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
