import * as supertest from 'supertest'
import App from '../src/app'

const testConfig = {
    "Port": 3000,
    "ImagesFolder": "tests/images",
    "CacheFolder": "tests/cache",
    "AcceptedFileTypes": ["jpg", "jpeg", "png"],
    "MaxResolution": "500x500"
  }


describe('Check simple /image endpoint', () => {
  it('works', (done) => {
    const app = new App(testConfig)
    supertest(app.express)
      .get('/image/test.png')
      .expect('Content-Type', 'image/png')
      .expect(200, done)
  })
})

describe('Check /image with size endpoint', () => {
  it('works', (done) => {
    const app = new App(testConfig)
    supertest(app.express)
      .get('/image/test.png?size=100x100')
      .expect('Content-Type', 'image/png')
      .expect(200, done)
  })
})

describe('Check /stats endpoint', () => {
  it('works', (done) => {
    const app = new App(testConfig)
    supertest(app.express)
      .get('/stats')
      .expect(200, '{"storedImages":2,"cachedImages":1}', done)
  })
})