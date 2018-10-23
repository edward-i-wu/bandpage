# Project 1 API

## Usage

### Gotchas
- the comments array starts out with two comments in it already
- this API has a temporary memory. It will sometimes forget all of it's comments (except for the two starter comments)

### URL
`https://project-1-api.herokuapp.com/`

### Authentication
- to register with the API and get a key, make a get request to `/register`
    - you can do this with the browser and you only need to do it once. Store the key in a global variable in your website.
- you must append `?api_key=<your_api_key_here>` to each of your API request URLs (except for `/register`)

## `GET /comments`
- Returns an array of comments
- Comments may be regularly cleared by the server
- Timestamp is in ms since epoch

### Response Body Example
```
[
    {
        "name": "Nigel",
        "comment": "This is a cool site",
        "id": 1,
        "likes": 0,
        "timestamp": 1530716269495
    }
]
```

## `POST /comments`
- Creates a new comment
- Will return a 400 error code if both 'name' and 'comment' are not included
- if successful, it will return the `comment` JSON object that was created

### Required Request Headers
```Content-Type: application/json```

### Post Body Example
```
{
	"name": "Nigel",
	"comment": "What a cool site"
}
```

### Response Body Example
```
{
    "name": "Nigel",
    "comment": "What a cool site",
    "id": 0,
    "likes": 0,
    "timestamp": 1530744795832
}
```

## `GET /showdates`
- Returns an array of showtime objects.

### Response Body Example
```
[
  {
    "id": 0,
    "date": "MON 21 MAY",
    "place": "Montebello Rockfest",
    "location": "Montebello, QC, Canada"
  },
  {
    "id": 1,
    "date": "SAT JUN 16",
    "place": "Coral Sky Ampitheatre",
    "location": "West Palm Beach, FL, United States"
  }
]
```

## `GET /register`
- Returns an object containing a unique api key

### Response Body Example
```
{
    "api_key": "e0eea5f0-0f8c-4b54-9fc4-ff50843766d4"
}
```

# The following endpoints are not required to satisfy the assignment requirements

## `PUT /comments/:id/like`
- Increments the like counter of the comment specified by `:id`
  - swap `:id` for the id of the element you want to like
- No Post body expected
- Will return a 404 if no comment with that ID is found.
- if successful, it will return the `comment` JSON object that you just liked
- *this endpoint is not required to satisfy the assignment requirements*

### Response Body Example
```
{
    "name": "Nigel",
    "comment": "What a cool site",
    "id": 0,
    "likes": 1,
    "timestamp": 1530744795832
}
```

## `DELETE /comments/:id`
- Deletes the comment specified by `:id`. 
  - swap `:id` for the id of the element you want to delete
- if successful, it will return the `comment` JSON object that you just deleted
- *this endpoint is not required to satisfy the assignment requirements*

### Response Body Example
```
{
    "name": "Nigel",
    "comment": "What a cool site",
    "id": 0,
    "likes": 0,
    "timestamp": 1530744795832
}
```

## Deployment
- node engine fixed to 8.11.x
- npm package versions fixed for stability
- Procfile defines how to start server