const request = require("supertest");
const app = require("../app");
const connection = require('../db/connection')

const seed = require("./../db/seeds/seed");
const data = require('../db/data/test-data')

beforeEach(() => seed(data));

afterAll(() => connection.end());
describe('api',()=>{
  it('', ()=>{
    
  })
})