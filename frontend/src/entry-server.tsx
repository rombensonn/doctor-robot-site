import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";
import { prerenderRoutes } from "./routes/routes";
import { renderSeoHead } from "./utils/seo";
import "./index.css";

export { prerenderRoutes, renderSeoHead };

export const render = (url: string) => {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  return { html };
};
