import express from "express";

import { nftsRoutes } from "./routes/nfts.routes";

const app = express();

app.use(express.json());

app.use("/nfts", nftsRoutes)

app.listen(3333, () => console.log("Server is running!"));