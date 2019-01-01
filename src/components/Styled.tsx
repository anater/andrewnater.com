import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

// inspired by tachyons type scale
const fontSizes = [0.875, 1, 1.25, 1.5, 2.25, 3, 5, 6].map(size => `font-size: ${size}rem;`);

const headingMargins = css`
  margin: unset;
  margin-top: 1em;
`;

const sansSerif = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
`;

const fadeIn = keyframes`
  from, to {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`;

export const GlobalStyles = css`
  body {
    ${sansSerif}
    ${fontSizes[1]};
    line-height: 1.5;
    color: rgba(255, 250, 250, 1);
    background: linear-gradient(to bottom right, #262362, #41bfaf);
  }

  h1,
  h2,
  h3 {
    ${headingMargins}
    letter-spacing: -0.03em;
  }

  h1 {
    ${fontSizes[5]}
    line-height: 1;
    font-weight: 900;
  }

  h2 {
    ${fontSizes[3]};
    line-height: 1.25;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: lightgray;
    background-color: transparent;
    mix-blend-mode: luminosity;
    border-bottom: 2pt solid;
    padding-bottom: 0.1em;
    transition: background-color 0.3s;

    :hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    :visited {
      opacity: 0.6;
    }
  }
`;

export const Small = styled.small`
  font-size: ${fontSizes[0]};
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 300;
`;
