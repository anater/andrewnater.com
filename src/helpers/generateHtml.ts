import * as fs from "fs";
import * as path from "path";
import * as cheerio from "cheerio";
import { Helmet } from "react-helmet";

// The path is relative from /dist directory
const templatePath = path.join(__dirname, "../../src/helpers/template.html");
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

export default function generateHtml(markup: string): string {
  // Get the serer-rendering values for the <head />
  const helmet = Helmet.renderStatic();
  const $template = cheerio.load(HTML_TEMPLATE);
  $template("head").prepend(
    helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
  );
  $template("#app").html(markup);

  return $template.html();
}
