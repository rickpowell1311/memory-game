# Memory Game

This game is a simple test of a player’s memory. A list of items are revealed in a certain order, and then the player attempts to repeat the items that were revealed after they are no longer visible. The player gets 3 points for an item in the correct position (or order) and 1 point for a correct item in the wrong position/order. This is a solo game, where the objective is for the player to achieve the highest score possible, playing as many times as they want.

## Requirements

1. Players are identified by a gamer tag of their choice.
   - The gamer tag should be alphanumeric and all lower-case.
   - A player can only start a game if they have first created themselves a gamer tag
   - Gamer tags must be unique, however there is no authentication in this game. If a player happens to choose the same gamer-tag as someone else, they will be playing as that player.
1. A gamer can play a game
   - A new game will generate and store a list of items in a certain order, and then return them to the player
   - A game is in a “Started” state when the items have been returned to the player, but the player has not yet submitted the items back.
   - An item a player submits is correct if it is spelt spelt correctly (the case can be different).
   - A game is in a “Complete” state when the items have been submitted back by the player.
   - Items cannot be submitted back for a specified game more than once.
   - When a game is completed, the player's score for that game should be calculated.
     - If the player just achieved their high score, then it should be updated and stored against the gamer tag.
   - A player can start a new game even without completing an old game first, and at this point the old game can be considered dismissed. (The player can no longer try to submit answers for the old game).
1. Players can delete and modify their data
   - They can reset high scores
   - They can delete their gamer tags. High scores for the gamer tag should be removed along with this.

## API Design

The API will not be versioned for simplicity, however all routes will follow the wildcard pattern /api/* to denote that all routes are part of the game API.

Again, and for simplicity, there is no authentication in the API.

### Routes

`GET /api/player/{gamer_tag}` - Retrieves the high score for the specified gamer_tag. 

`DELETE /api/player/{gamer_tag}` - Deletes the player with the specified gamer_tag

`POST /api/player{gamer_tag}/reset-high-score` - Resets the high score for the player with the specified gamer_tag

`POST /api/player/{gamer_tag}/create-game` - Creates a game for the gamer with the specified gamer_tag. The request has an empty body. The response returns a game_id, which can be used to retrieve the game items.

`GET /api/game/{game_id}` - Retrieves the game items for a specified game_id. Items are returned, and if the game is complete, a score will also be returned.

`PUT /api/game/{game_id}` - The player gives their answers for a specified game_id. The score is calculated for the game. The response is empty

## Running the API & Deployment

Docker compose will be used to spin up a running instance of a database and API when running the application locally. 

This will:
1. Spin up a database container
1. Run a set of migrations for the schema against this database container
1. Start up an API container

The application will not be deployed to any cloud environment, however the API and migrations should be configurable such that they can connect to any database easily.

