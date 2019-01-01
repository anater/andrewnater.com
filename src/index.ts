import * as Contentful from "contentful";
import { createElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

import generateHtml from "./helpers/generateHtml";
import App from "./App";

// initialize Contentful client
const client = Contentful.createClient({
  space: "yf1oyadbtzfa",
  accessToken: "17aa7d1318523a90b15310571fdf467fb16049a2d4eaa9aa1bcca9bfc88d2b18"
  // host: "preview.contentful.com"
});

console.log("ℹ️ Fetching Data...");

client
  .getEntries({
    content_type: "page",
    include: 3
  })
  .then(processPages)
  .catch(console.error);

function processPages(response: Contentful.EntryCollection<any>) {
  const pages = response.items;

  console.log("ℹ️ Rendering pages...");

  pages.forEach(({ fields }) => {
    // render page
    const Component = createElement(App, fields);
    const markup = ReactDOMServer.renderToStaticMarkup(Component);
    const html = generateHtml(markup);
    // save page to disk
    savePageToDisk(fields.slug, html);
  });
}

function savePageToDisk(location: string, html: string) {
  // public path is one above
  const locationPath = path.join(__dirname, "..", `public${location}`);
  const pathExists = fs.existsSync(locationPath);
  console.log({ locationPath, pathExists });
  // if the path doesn't exist, create it
  if (pathExists === false) {
    mkdirp.sync(locationPath);
  }
  // create file at path
  fs.writeFile(`${locationPath}/index.html`, html, writeFileErrror => {
    if (writeFileErrror) throw writeFileErrror;
    else console.log(`✅ Saved: ${location}`);
  });
}
