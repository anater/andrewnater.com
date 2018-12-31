import * as React from "react";
import { Helmet } from "react-helmet";

import Default from "./layouts/Default";

export default class App extends React.PureComponent<any> {
  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderPage()}
      </>
    );
  }

  renderHeader = () => (
    <Helmet>
      <title>{this.props.title}</title>
      <meta name="description" content={this.props.description} />
      <body className="sans-serif" />
    </Helmet>
  );

  renderPage = () => {
    const { type, content } = this.props;
    // choose layout
    switch (type) {
      case "Default":
      default:
        return <Default content={content} />;
    }
  };
}