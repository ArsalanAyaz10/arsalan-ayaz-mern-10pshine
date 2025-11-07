import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";
import "./setup.js";

const request = supertest(app);

describe("Notes API", () => {
  let token;
  let noteId;

  before(async () => {
    await request.post("/api/auth/register").send({
      name: "noteuser",
      email: "note@example.com",
      password: "123456",
    });

    const loginRes = await request.post("/api/auth/login").send({
      email: "note@example.com",
      password: "123456",
    });

    token = loginRes.body.accessToken;
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
    noteId = res.body.note._id;
  });

  it("should fetch all notes for the user", async () => {
    const res = await request
      .get("/api/notes/fetch")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("notes");
    expect(res.body.notes).to.be.an("array");
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
    expect(res.body.message).to.match(/deleted/i);
  });
});
