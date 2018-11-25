'use strict';

document.addEventListener("DOMContentLoaded", function(event) {
  
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

  function escape(html, encode) {
    return html
      .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

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

  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');
  console.log(editor, preview);
  console.log(markdown);
  console.log(marked(markdown));
  editor.innerHTML = escape(markdown);
  preview.innerHTML = marked(markdown);

  editor.addEventListener('input', (e) => preview.innerHTML = marked(editor.value));
});
