import koa from "koa";
import setupRoutes from "./routes/index";

const app = new koa();

const port = process.env.PORT || 5000;

app.use(setupRoutes.routes());
app.use(setupRoutes.allowedMethods());

app.listen(port, () => console.log(`API Running on port ${port}`));
