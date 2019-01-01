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
    </Helmet>
  );

  renderPage = () => {
    const { type, content } = this.props;
    return <Default type={type} content={content} />;
  };
}
