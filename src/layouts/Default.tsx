import * as React from "react";
import * as Contentful from "contentful";

import Markdown from "../components/Markdown";

interface Props {
  content: Array<ContentItem>;
}

interface ContentItem {
  sys: Contentful.Sys;
  fields: any;
}

export default class Default extends React.PureComponent<Props> {
  render() {
    const { content } = this.props;
    const date = new Date();
    const year = date.getFullYear();
    return (
      <main className="measure-wide center">
        {content.length > 0 && content.map(this.renderContentItem)}
        <footer className="tc f6 mb5">Copyright Andrew Nater {year}</footer>
      </main>
    );
  }

  renderContentItem = ({ sys, fields }: ContentItem) => {
    const { id, contentType } = sys;
    const type = contentType.sys.id;

    switch (type) {
      case "text":
        // render text
        return (
          <section key={id}>
            {fields.showTitle && <h1>{fields.title}</h1>}
            <Markdown content={fields.body} />
          </section>
        );
      case "page":
        // render page
        return (
          <section key={id}>
            <h2><a href={fields.slug}>{fields.title}</a></h2>
            <p>{fields.description}</p>
          </section>
        )
      case "group":
        // render group
        return (
          <section key={id}>
            {fields.showTitle && <h1>{fields.title}</h1>}
            {fields.items && fields.items.map(this.renderContentItem)}
          </section>
        );
      default:
        return false;
    }
  };
}
