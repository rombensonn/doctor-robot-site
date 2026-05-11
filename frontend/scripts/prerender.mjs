import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prerenderRoutes, render, renderSeoHead } from "../dist/server/entry-server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist", "client");
const templatePath = path.join(dist, "index.html");
const template = await fs.readFile(templatePath, "utf8");

const writeRoute = async (route) => {
  const { html } = render(route);
  const seoHead = renderSeoHead(route);
  const output = template.replace("<!--seo-head-->", seoHead).replace("<!--app-html-->", html);

  if (route === "/404") {
    await fs.writeFile(path.join(dist, "404.html"), output, "utf8");
    return;
  }

  const targetDir = route === "/" ? dist : path.join(dist, route);
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(path.join(targetDir, "index.html"), output, "utf8");
};

await Promise.all(prerenderRoutes.map(writeRoute));

console.log(`Prerendered ${prerenderRoutes.length} routes.`);
