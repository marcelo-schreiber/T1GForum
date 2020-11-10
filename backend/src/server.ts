import * as express from "express";
import * as cors from "cors";
import { join } from "path";
import { router } from "./routes";

import handleError from "./utils/errorResponse";
import corsOrigin from "./middleware/corsOrigin";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // access to req.body
app.use(corsOrigin);
// all routes
app.use(router);
app.use("/uploads", express.static(join("uploads")));

app.use("*", handleError.handleNotFound);

app.listen(PORT, () => console.log(`T1GForum App is running on port ${PORT}`));
