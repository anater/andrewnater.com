import * as React from "react";
import * as Contentful from "contentful";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";

import { Title, Heading, Body, Small, GlobalStyles } from "../components/Styled";
import Markdown from "../components/Markdown";

interface Props {
  content: Array<ContentItem>;
}

interface ContentItem {
  sys: Contentful.Sys;
  fields: any;
}

const MainStyled = styled.main`
  width: 90%;
  max-width: 34em;
  margin: 0 auto;
`;

export default class Default extends React.PureComponent<Props> {
  render() {
    const { content } = this.props;
    const date = new Date();
    const year = date.getFullYear();
    return (
      <>
        <Global styles={GlobalStyles} />
        <MainStyled>
          {content.length > 0 && content.map(this.renderContentItem)}
          <footer className="f6 mb5">
            <Small>Copyright Andrew Nater {year}</Small>
          </footer>
        </MainStyled>
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
            {fields.showTitle && <Title>{fields.title}</Title>}
            <Markdown content={fields.body} />
          </section>
        );
      case "page":
        // render page
        return (
          <section key={id}>
            <Heading>
              <a href={fields.slug}>{fields.title}</a>
            </Heading>
            <Body>{fields.description}</Body>
          </section>
        );
      case "group":
        // render group
        return (
          <section key={id}>
            {fields.showTitle && <Title>{fields.title}</Title>}
            {fields.items && fields.items.map(this.renderContentItem)}
          </section>
        );
      default:
        return false;
    }
  };
}
