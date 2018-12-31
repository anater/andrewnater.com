import * as Contentful from "contentful";
import { createElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";

import generateHtml from "./helpers/generateHtml";
import App from "./App";

// initialize Contentful client
const client = Contentful.createClient({
  space: "yf1oyadbtzfa",
  // using preview access token
  // TODO: replace with environment variables
  accessToken: "73c71d01c6beec2d19998b895b82c6e0e10eb05f070f9115b5e4c57afff3ee6a",
  host: "preview.contentful.com"
});

console.log("ℹ️ Fetching Data...");

client
  .getEntries({
    content_type: "page",
    include: 3
  })
  .then(processPages);

function processPages(response: Contentful.EntryCollection<any>) {
  const pages = response.items;

  console.log("ℹ️ Rendering pages...");

  pages.map(({ fields }) => {
    // render page
    const Component = createElement(App, fields);
    const markup = ReactDOMServer.renderToStaticMarkup(Component);
    const html = generateHtml(markup);
    // save page to disk
    savePageToDisk(fields.slug, html);
  });
}

function savePageToDisk(location: string, html: string) {
  const path = `${__dirname}/../public${location}`;
  const pathExists = fs.existsSync(path);
    
  // if the path doesn't exist, create it
  if (pathExists === false) {
    fs.mkdirSync(path, { recursive: true });
  }

  // create file at path
  fs.writeFile(`${path}/index.html`, html, writeFileErrror => {
    if (writeFileErrror) throw writeFileErrror;
    console.log(`✅ Saved: ${path}`);
  });
}