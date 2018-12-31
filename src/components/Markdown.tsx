import * as React from "react";
import * as MarkdownIt from "markdown-it";

interface Props {
  content: string;
}

const markdownIt = new MarkdownIt();

export default ({ content }: Props) => {
  const __html = markdownIt.render(content);
  return <div dangerouslySetInnerHTML={{ __html }} />
};
