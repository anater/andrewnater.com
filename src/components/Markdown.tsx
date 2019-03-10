import * as React from "react";
import * as MarkdownIt from "markdown-it";
import * as hljs from "highlight.js";

interface Props {
  content: string;
}

const markdownIt = new MarkdownIt({
  highlight: (string: string, language: string): string => {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(language, string).value;
      } catch (_) {
        throw new EvalError("Highlighting failed");
      }
    }
    return "";
  }
});

export default ({ content }: Props) => {
  const __html = markdownIt.render(content);
  return <div dangerouslySetInnerHTML={{ __html }} />;
};
