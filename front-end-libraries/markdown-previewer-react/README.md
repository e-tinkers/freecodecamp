freeCodeCamp Markdown Previewer challenge - React
=========================================

This implementation uses React. However, I noticed that you can achieved the same result with pure JavaScript with only 5 lines of code, excluding all the common codes shared by both JavaScript and React implementations, and a helper function `escape()` which is required in JavaScript implementation but not in React. For this particular project, React is an overkill and take much of thinking as well as typing than pure JavaScript implementation. My take away from this exercise is: **Use the right tool for the right job.**

### Code of using pure JavaScript:
```
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  editor.innerHTML = escape(markdown);
  preview.innerHTML = marked(markdown);

  editor.addEventListener('input', (e) => preview.innerHTML = marked(editor.value));
```
* I borrow the helper function escape() from [marked](https://github.com/markedjs/marked/blob/master/test/browser/test.js) test code.
