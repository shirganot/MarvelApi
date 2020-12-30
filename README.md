# MarvelApi

A Marvel Api, which answers some of the greatest questions of the universe.

## Project Architecture

### Folders

- **config**: contains config files.
- **routes**: contains all the endpoints.
- **controllers**: contains all the business logic of a call.
- **services**: handles all the third-party calls.
- **middlewares**: contains all the project middlewares.
- **data**: contains files that store the movie and actors list.

### Files

- **app.js**: start point of the project. Contains the server definition.
- **constants.js**: contains default values used in the project.

## Endpoints

Organized in the order of the questions

### Actors

The official API.

1. 2 approaches

- `/api/actors/:actorName/movies` - for specific actor
- `/api/actors/movies` - for all the actors stored in the project.

2. `/api/actors/moreThanOneCharacter`
3. `/api/actors/playedTheSameRole`

### Movies

While developing, at first, I didn't understand the questions correctly.
So, the first draft of the endpoints moved over the movie list but didn't consider the actors list.
This has been corrected in the official API, however, I left it under `/movies` path.

Enjoy:)

2. `/api/movies/moreThanOneCharacter`
3. `/api/movies/playedTheSameRole`

## Data

I stored the list you sent in the email under the folder `data`.

- Efficiently, I would probably store in the "database" the actors ids.
- I wanted to add an option to send the movie and actor list through the body, but I couldn't make it.
- There is an incorrect value in the actors list - "Black Panther". From what I know, there isn't a way to search characters, only names of real people. I commented it out (and added the actor's real name) for the sake of the project, however, you can uncomment it to see the error handling.

## Notes On The Questions

## 2

Characters' names are sometimes written differently in the movies database, so I used a library to handle it.

## 3 - The Bonus

I didn't find a character id in the API (cast_id and credit_id seems suitable, but it turns out it's more for the tv shows, an internal order for the database developers).
So, I used the names of the characters as identifiers, which is not a good practice, especially because characters' names are sometimes written differently. I used a library to try to fix it, but it is not perfect.

## Libraries

- **string-similarity**: I used it to check similarity in characters names, for questions 2-3.

## Notes

- The assignment was very fun to make:) The Marvel concept is a really cool idea. Thank you:)
