import { createRequestHandler } from "@remix-run/express"
import express, { Express } from "express"

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      )

const app: Express = express()

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

app.all("*", createRequestHandler({ build: build as any }))

app.listen(1008, () => {
  console.log("App listening on http://localhost:1008")
});
