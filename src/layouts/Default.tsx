import * as React from "react";
import * as Contentful from "contentful";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import { format } from "date-fns";

import { Small, GlobalStyles } from "../components/Styled";
import Markdown from "../components/Markdown";

interface Props {
  content: Array<ContentItem>;
  type: String;
}

interface ContentItem {
  sys: Contentful.Sys;
  fields: any;
}

const Main = styled.main`
  width: 90%;
  max-width: 34em;
  margin: 0 auto;
`;

const Header = styled.header`
  padding: 3rem 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    border-bottom: none;
    mix-blend-mode: unset;
    font-size: 1.5rem;
  }
`;

const Footer = styled.footer`
  padding: 4rem 0;
  text-align: center;
`;

export default class Default extends React.PureComponent<Props> {
  render() {
    const { content } = this.props;
    const date = new Date();
    const year = date.getFullYear();

    return (
      <>
        <Global styles={GlobalStyles} />
        <Main>
          <Header>
            <Small>Andrew Nater</Small>
            <nav>
              <a href="/" title="Go to the homepage">
                🏠
              </a>
            </nav>
          </Header>
          {content.length > 0 && content.map(this.renderContentItem)}
          <Footer>
            <Small>Copyright Andrew Nater {year}</Small>
          </Footer>
        </Main>
      </>
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
            {this.props.type === "Post" && this.getDate(sys)}
            <Markdown content={fields.body} />
          </section>
        );
      case "group":
        // render group
        return (
          <section key={id}>
            {fields.showTitle && <h1>{fields.title}</h1>}
            {fields.items && fields.items.map(this.renderContentItem)}
          </section>
        );
      case "page":
        // render page
        return (
          <section key={id}>
            <h2>
              <a href={fields.slug}>{fields.title}</a>
            </h2>
            <p>{fields.description}</p>
          </section>
        );
      default:
        return false;
    }
  };

  getDate = (sys: Contentful.Sys) => {
    const { createdAt } = sys;
    const formattedDate = format(createdAt, "MMMM D, YYYY");
    return (
      <Small>
        <time>{formattedDate}</time>
      </Small>
    );
  };
}
