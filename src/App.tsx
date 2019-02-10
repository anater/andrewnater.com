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
        <meta name="author" content="Andrew Nater" />
        <meta name="description" content={description} />

        {/* Schema.org markup for Google+ */}
        <meta itemProp="name" content="andrewnater.com" />
        <meta itemProp="description" content={description} />

        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:site" content="@a_Nater" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@a_Nater" />

        {/* <!-- Open Graph data --> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="andrewnater.com" />
      </Helmet>
      <Default type={type} content={content} />
    </>
  );
}
