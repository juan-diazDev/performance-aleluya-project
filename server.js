import { createRequestHandler } from "@remix-run/express"
import express from "express"

const viteDevServer =
  import.meta.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      )

const app = express()

app.use(
  viteDevServer
    ? viteDevServer.middlewares
    : express.static("build/client")
);

const build = viteDevServer
  ? () =>
      viteDevServer.ssrLoadModule(
        "virtual:remix/server-build"
      )
  : await import("./build/server/index.js")

app.use(express.static("build/client"))

app.all("*", createRequestHandler({ build }))

const port = import.meta.env.PORT || 3000;

app.listen(1008, () => {
  console.log(`App listening on http://localhost:${port}`)
});
