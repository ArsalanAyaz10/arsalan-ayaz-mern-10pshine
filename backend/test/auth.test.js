import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";
import "./setup.js";

const request = supertest(app);

describe("Auth API", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request.post("/api/auth/register").send({
      name: "testuser",
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("user");
    expect(res.body.user.email).to.equal("test@example.com");
  });

  it("should login the user and return a token", async () => {
    const res = await request.post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property("accessToken");
    token = res.body.accessToken;
  });

  it("should logout the user successfully", async () => {
    const res = await request
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.be.oneOf([200, 204]);
  });
});
