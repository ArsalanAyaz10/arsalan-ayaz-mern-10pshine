process.env.NODE_ENV = "test"; // ✅ must be very top

import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";
import "./setup.js";

const request = supertest(app);

describe("Notes API", function () {
  this.timeout(10000);

  let token;
  let noteId;

  before(async () => {
    const registerRes = await request.post("/api/auth/register").send({
      name: "noteuser",
      email: "note@example.com",
      password: "123456",
    });
    expect(registerRes.status).to.equal(201);

    const loginRes = await request.post("/api/auth/login").send({
      email: "note@example.com",
      password: "123456",
    });

    expect(loginRes.status).to.equal(200);
    token = loginRes.body.accessToken;
    expect(token).to.exist;
  });

  it("should create a new note", async () => {
    const res = await request
      .post("/api/notes/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Note",
        content: "Note content",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("note");
    expect(res.body.note.title).to.equal("Test Note");

    noteId = res.body.note._id;
    expect(noteId).to.exist;
  });

  it("should fetch all notes for the logged-in user", async () => {
    const res = await request
      .get("/api/notes/fetch")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("notes");
    expect(res.body.notes).to.be.an("array");
    expect(res.body.notes.length).to.be.greaterThan(0);
  });

  it("should update a note", async () => {
    const res = await request
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Note",
        content: "Updated content",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("updatedNote");
    expect(res.body.updatedNote.title).to.equal("Updated Note");
  });

  it("should delete a note", async () => {
    const res = await request
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
    expect(res.body.message.toLowerCase()).to.include("deleted");
  });
});
