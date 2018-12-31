import styled from "@emotion/styled";
import { css } from "@emotion/core";

// inspired by tachyons type scale
const fontSizes = [0.875, 1, 1.25, 1.5, 2.25, 3, 5, 6].map(
  size =>
    `
      font-size: ${size}rem;
    `
);

const headingMargins = css`
  margin: unset;
  margin-top: 1em;
`;

const sansSerif = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const GlobalStyles = css`
    body {
      ${sansSerif}
      font-size: ${fontSizes[1]};
      line-height: 1.5;
    }

    h1,
    h2,
    h3 {
      ${headingMargins}
    }

    h1 {
      ${fontSizes[4]}
      line-height: 1;
    }

    h2 {
      ${fontSizes[3]};
      line-height: 1.25;
    }
    
    a {
      text-decoration: none;
      color: inherit;
      background-color: transparent;
      border-bottom: 2pt solid;
      padding-bottom: 0.1em;
      transition: background-color 0.3s;

      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      :visited {
        opacity: 0.6;
      }
    }
`;

export const Small = styled.small`
  font-size: ${fontSizes[0]};
  line-height: 1.25;
`;
