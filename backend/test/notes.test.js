// File: backend/test/notes.test.js (CORRECTED)

import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";
import "./setup.js";
import User from "../models/UserModel.js"; // Assume you need this for cleanup
import Note from "../models/NoteModel.js"; // Assume you need this for cleanup

const request = supertest(app);

describe("Notes API", () => {
    let token;
    let noteId;
    const testEmail = "note@example.com";

    // Use beforeEach to ensure a fresh, valid token for *every* test, improving isolation.
    beforeEach(async () => {
        // Aggressive cleanup (Good practice in CI)
        await User.deleteMany({ email: testEmail });
        await Note.deleteMany({}); 

        // 1. Register a new user
        await request.post("/api/auth/register").send({
            name: "noteuser",
            email: testEmail,
            password: "123456",
        });

        // 2. Login and get a fresh token
        const loginRes = await request.post("/api/auth/login").send({
            email: testEmail,
            password: "123456",
        });

        // *** CRITICAL: Ensure the token variable is set correctly ***
        token = loginRes.body.accessToken;
        
        // This is a sanity check, which you can remove later:
        if (!token) {
            throw new Error("Failed to retrieve access token during setup!");
        }
    });

    // Cleanup after the entire suite runs (optional, but clean)
    after(async () => {
        await User.deleteMany({ email: testEmail });
        await Note.deleteMany({}); 
    });


    it("should create a new note", async () => {
        const res = await request
            .post("/api/notes/create")
            .set("Authorization", `Bearer ${token}`) // <--- Uses the token from beforeEach
            .send({
                title: "Test Note",
                content: "Note content",
            });

        expect(res.status).to.equal(201); // Expect 201 Created
        expect(res.body).to.have.property("note");
        noteId = res.body.note._id;
    });

    it("should fetch all notes for the user", async () => {
        const res = await request
            .get("/api/notes/fetch")
            .set("Authorization", `Bearer ${token}`); // <--- Uses the token

        expect(res.status).to.equal(200); // Expect 200 OK
        expect(res.body).to.have.property("notes");
        expect(res.body.notes).to.be.an("array");
    });

    it("should update a note", async () => {
        // NOTE: This test will fail if 'noteId' is not set. 
        // For production tests, you should create a note *in* a beforeEach or setup block.
        const res = await request
            .put(`/api/notes/${noteId}`)
            .set("Authorization", `Bearer ${token}`) // <--- Uses the token
            .send({
                title: "Updated Note",
                content: "Updated content",
            });

        expect(res.status).to.equal(200); // Expect 200 OK
        expect(res.body).to.have.property("updatedNote");
        expect(res.body.updatedNote.title).to.equal("Updated Note");
    });

    it("should delete a note", async () => {
        const res = await request
            .delete(`/api/notes/${noteId}`)
            .set("Authorization", `Bearer ${token}`); // <--- Uses the token

        expect(res.status).to.equal(200); // Expect 200 OK
        expect(res.body.message).to.match(/deleted/i);
    });
});