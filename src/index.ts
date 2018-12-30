import * as Contentful from "contentful";
import { createElement } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as fs from "fs";

import generateHtml from "./build/generateHtml";
import App from "./App";

// initialize Contentful client
const client = Contentful.createClient({
  space: "yf1oyadbtzfa",
  // using preview access token
  // TODO: replace with environment variables
  accessToken: "73c71d01c6beec2d19998b895b82c6e0e10eb05f070f9115b5e4c57afff3ee6a",
  host: "preview.contentful.com"
});

client
  .getEntries({
    content_type: "page"
  })
  .then(processPages);

function processPages(response: Contentful.EntryCollection<any>) {
  const pages = response.items;

  pages.map(({ fields }) => {
    // render page
    const Component = createElement(App, fields);
    const markup = ReactDOMServer.renderToStaticMarkup(Component);
    const html = generateHtml(markup);
    // save page to disk
    savePageToDisk({ slug: fields.slug, html });
  });
}

function savePageToDisk(page: any) {
  const path = `${__dirname}/../public${page.slug}`;
  const saveFile = () => fs.writeFile(`${path}/index.html`, page.html, writeFileErrror => {
    if (writeFileErrror) throw writeFileErrror;
    console.log(`✅ Saved: ${path}`);
  });
  // if we already have this directory, save
  if (fs.existsSync(path)) {
    saveFile();
  } else {
    // make the directory, then save
    fs.mkdir(path, { recursive: true }, (mkDirError) => {
      if (mkDirError) throw mkDirError;
      saveFile();
    });
  }
}
