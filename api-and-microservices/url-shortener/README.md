<h1 id="api-project-url-shortener-microservice">API Project: URL Shortener Microservice</h1>
<h2 id="user-story-">User Story:</h2>
<ul>
<li>I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
Example : <code>{&quot;original_url&quot;:&quot;www.example.com&quot;,&quot;short_url&quot;:1}</code></li>
<li>If I pass an invalid URL that doesn&#39;t follow the http://www.example.com(/more/routes) format, the JSON response will contain an error like <code>{&quot;error&quot;:&quot;invalid URL&quot;}</code>.
HINT: to be sure that the submitted url points to a valid site you can use the function <code>dns.lookup(host, cb)</code> from the dns core module.</li>
<li>When I visit the shortened URL, it will redirect me to my original link.</li>
</ul>
<h3 id="short-url-creation">Short URL Creation</h3>
<p>Request: <code>POST [project_url]/api/shorturl/new - https://www.example.com</code></p>
<p>Response: <code>{&quot;original_url&quot;:&quot;www.example.com&quot;,&quot;short_url&quot;:1}</code>   </p>
<h3 id="shorten-url-usage-">Shorten URL Usage:</h3>
<p>Request: <code>GET [this_project_url]/api/shorturl/1</code></p>
<p>Response: Will Redirect to https://www.example.com</p>
<p>See <a href="https://henry-url-shortener.glitch.me" rel="nofollow">Live Demo</a></p>
