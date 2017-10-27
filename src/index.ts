import App from './app'

const appConfig = require('../config/app.json');

const port = process.env.PORT || appConfig.Port;

const app = new App(appConfig)
app.express.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})