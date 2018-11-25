'use strict';

const markdown = `[![marked logo](marked-logo.png)](https://marked.js.org)

# Marked

- built for speed
- low-level compiler for parsing markdown
- light-weight and supporting all markdown features
- works in a browser, on a server, or from a command line interface (CLI)

## Demo

Checkout the [demo page](https://marked.js.org/demo/) to see marked in action

## Installation

**CLI:** \`npm install -g marked\`

## Usage
    <body>
      <div id="content"></div>
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
      <script>
        document.getElementById('content').innerHTML =
          marked('## Marked in the browser - Rendered by **marked**.');
      </script>
    </body>

> WARNING: Marked does not sanitize the output HTML by default\n
`;

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`;
};

let md = marked.setOptions(
  {
    "breaks": true,
    "gfm": true,
    "renderer": renderer
  }
);

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: props.content};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({content: e.target.value});
  }
  mdToHtml() {
    return marked(this.state.content)
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="editor">Editor
          <textarea id="editor"
            onChange = {this.handleChange}
            defaultValue = {this.props.content}
          ></textarea>
          </label>
        </div>
        <div className="col-md-6">
          <label htmlFor="preview">Preview
          <div id="preview"
            dangerouslySetInnerHTML={{__html: this.mdToHtml()}}
          ></div>
          </label>
        </div>
      </div>
    );
  }
};

ReactDOM.render(
  <MarkdownPreviewer content={markdown}/>,
  document.getElementById('content')
);
