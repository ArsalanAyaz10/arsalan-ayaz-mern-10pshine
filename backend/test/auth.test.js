import { expect } from "chai";
import supertest from "supertest";
import crypto from "crypto";
import app from "../app.js";
import User from "../models/UserModel.js";
import "./setup.js";

const request = supertest(app);

describe("Auth API", () => {
  let token;
  let resetToken;

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

  it("should trigger forgot password and set token in DB", async () => {
    const res = await request.post("/api/auth/forgot-password").send({
      email: "test@example.com",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");

    const user = await User.findOne({ email: "test@example.com" });
    expect(user.resetPasswordToken).to.exist;
    expect(user.resetPasswordExpire).to.exist;

    resetToken = user.resetPasswordToken;
  });

  it("should reset the password successfully", async () => {
    const rawToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    await User.updateOne(
      { email: "test@example.com" },
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: Date.now() + 10 * 60 * 1000,
      }
    );

    const res = await request
      .put(`/api/auth/reset-password/${rawToken}`)
      .send({ password: "newPassword123" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.match(/reset/i);

    // Verify token removed
    const updatedUser = await User.findOne({ email: "test@example.com" });
    expect(updatedUser.resetPasswordToken).to.be.undefined;
    expect(updatedUser.resetPasswordExpire).to.be.undefined;
  });
});
