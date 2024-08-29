import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { httpServer } from "./app";
import "./socket";

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
