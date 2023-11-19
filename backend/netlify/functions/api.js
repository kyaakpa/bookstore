import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

api.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Server connected to Database");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export const handler = serverless(api);
