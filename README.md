# pym
A microservice that serves images and resizes them according to the request. The name is from the movie Ant-Man. Pym (Dr. Hank Pym) is the name of the doctor that shrunk Scott Lang.

## Docker
In order to run the service inside a container run the following commands:

`docker build -t pym .`

`docker run -p 3000:3000 pym`

## Running the code
For development use `npm run dev`
For prod run `npm run tsc` to generate the js files from typescript and just run `node dist/src/index.js` afterwords.

- stats endpoint: `http://localhost:3000/stats`
- image endpoint: `http://localhost:3000/image/test.png?size=123x123`
