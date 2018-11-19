# API Project: Exercise Tracker Microservice

User can create a new user name and add exercise log via online forms. User can query exercise logs via API endpoints. API endpoints are described below.

### Add new user:
API endpoint:

    POST /api/exercise/new-user --username
Response:

    {"username":"testingE","_id":"ByiJUd06Q"}
Error response:

    username already taken

### Add exercises
API endpoint:

    POST /api/exercise/add --{user_id}, {description}, {duration}, [date]
Response:

    {"username":"testingE",
      "description":"cycling",
      "duration":120,
      "_id":"ByiJUd06Q",
      "date":"Sun Nov 18 2018"
    }
Error response:

    unkown userId
    Path `description` is required.
### GET users's exercise log:
API endpoint:

    GET /api/exercise/log?{userId=userId}[&from=from][&to=to][&limit=limit]
Response:

    {
      "_id":"ByiJUd06Q",
      "username":"testingE",
      "count":1,
      "log":[
          {"description":"cycling",
          "duration":120,
          "date":"Sun Nov 18 2018"}
        ]
    }
  for newly created user, the response will be:

      {"_id":"rytz_qkA7","username":"emptylog","count":0,"log":[]}
Error response:

    unknown userId

{ } = required
[  ] = optional
from, to = dates (yyyy-mm-dd);
duration = in minutes;
limit = number

See [live demo](https://henry-exercise-tracker.glitch.me)
