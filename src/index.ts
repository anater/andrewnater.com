import * as Contentful from "contentful";
import { createElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as dotenv from "dotenv";

import generateHtml from "./helpers/generateHtml";
import App from "./App";

dotenv.config();

// initialize client params
let clientParams: Contentful.CreateClientParams = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN
};
// if this is dev, use the preview token and host
if (process.env.NODE_ENV === "development") {
  clientParams.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
  clientParams.host = "preview.contentful.com";
  console.log(clientParams);
}
// initialize Contentful client
const client = Contentful.createClient(clientParams);

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
