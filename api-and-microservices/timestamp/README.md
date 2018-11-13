<h1>API Project: Timestamp Microservice</h1>
<p>This is my implementation of freeCodeCamp API and microservice proejct - timestamp. It returns a JSON response containing unix timestamp and utc date format based on user's request with a valid time stamp or ISO-8601 date string.</p>
<h2>User Stories (WIP):</h2>
<ol>
<li>The API endpoint is GET [project_url]/api/timestamp/:date_string?</li>
<li>A date string is valid if can be successfully parsed by new Date(date_string). Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.</li>
<li>If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.</li>
<li>If the date string is valid the api returns a JSON having the structure <code>{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }</code> e.g. <code>{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}</code></li>
<li>If the date string is invalid the api returns a JSON having the structure <code>{"error" : "Invalid Date" }</code>.</li>
</ol>
<h3>Example Usage:</h3>
<p><a href="https://henry-fcc-timestamp.glitch.me/api/timestamp/2015-12-25" target="_blank" rel="nofollow">[base_url]/api/timestamp/2015-12-25</a> A valid date</p>
<p><a href="https://henry-fcc-timestamp.glitch.me/api/timestamp/1450137600" target="_blank" rel="nofollow">[base_url]/api/timestamp/1450137600</a> A Valid timestamp</p>
<p><a href="https://henry-fcc-timestamp.glitch.me/api/timestamp/2015-13-31" target="_blank" rel="nofollow">[base_url]/api/timestamp/2015-13-31</a> An invalid date</p>
<p><a href="https://henry-fcc-timestamp.glitch.me/api/timestamp" target="_blank" rel="nofollow">[base_url]/api/timestamp</a> No params submitted</p>
<h3>Example Output:</h3>
<pre><code>{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}</code></pre>
