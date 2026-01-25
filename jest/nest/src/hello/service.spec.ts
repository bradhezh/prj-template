import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";

import conf from "@/conf";
import { HelloModule } from "./module";

describe("HelloModule", () => {
  let app: INestApplication;
  let api: TestAgent;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HelloModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    api = supertest(app.getHttpServer());
  });

  it("hello", () => {
    return api.get(conf.ep.api).expect(200).expect("Hello NestJS!");
  });

  afterAll(async () => {
    await app.close();
  });
});
