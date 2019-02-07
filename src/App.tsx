import * as React from "react";
import { Helmet } from "react-helmet";

import Default from "./layouts/Default";

interface Page {
  title: string;
  type: string;
  content: Array<any>;
  description: string;
}

export default function App({ title, type, content, description }: Page) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Default type={type} content={content} />
    </>
  );
}
