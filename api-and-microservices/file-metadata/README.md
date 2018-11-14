<h1>API Project: File Metadata Microservice</h1>
<p>When a file is uploaded to the server, the server will return a JSON object with the file name and size of the file in bytes.</p>
<h2>User Stories:</h2>
<ol>
<li>I can submit a form object that includes a file upload.</li>
<li>The from file input field has the "name" attribute set to "upfile". We rely on this in testing.</li>
<li>When I submit something, I will receive the file name, and size in bytes within the JSON response.</li>
</ol>
<h3>Usage:</h3>
<p>Click the "Choose File" button on the home page to select a file, and click on "Upload" to upload it.</p>
<h3>Output:</h3>
<p>The file name and size of the file in bytes will be displayed as a JSON object at [base_url]/api/upload like this:</p>
<pre><code>{"name":"example.txt","type":"text/plain","size":1229}</code></pre>
