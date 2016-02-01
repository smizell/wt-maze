# Webtask Maze

This was a fun project to make a webtask solve a maze hosted by another
webtask. It uses hypermedia in the server and the client follows the links
provided by the client to find the exit to the maze.

It allows for people to come up with the own mazes by modifying the server file
to create their own maze webtask. People can either use the client provided or
create their own client to solve the maze.

## Usage

1. You'll need to create a webtask server from [server.js](./server.js)
1. Next, create a webtask client from [client.js](./client.js)
1. Finally, point your client at your server with a query parameter
   `?mazeUrl=<SERVER_URL>` and wait for it to solve the maze.

## Developing

All relevant code is in [server.js](./server.js) or [client.js](./client.js). To
run the tests, use `npm test`.

## Designing Your Own Maze

To come up with a maze on your own, draw out a square maze on a piece of paper
(circular mazes will not work). Chop your maze into cells and give each cell its
own number—order does not matter. Finally, translate that into an object
similar to that in [server.js](./server.js).

## License

This is licensed under MIT, so feel free to use. See the [license](LICENSE) for
the actual license.
