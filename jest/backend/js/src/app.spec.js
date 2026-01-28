import supertest from "supertest";

import conf from "./conf";
import app from "./app";

describe("app", () => {
  let api;

  beforeAll(() => {
    api = supertest(app);
  });

  describe("hello", () => {
    it("should return hello", async () => {
      return api.get(conf.ep.api).expect(200).expect("Hello Express!");
    });
  });

  it("DB_URL", () => {
    expect(conf.dbUrl).toBe("DB_URL_set!");
  });
});
