import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";
import "./setup.js";
import User from "../models/UserModel.js"; 
import Note from "../models/NotesModel.js"; 

const request = supertest(app);

describe("Notes API", () => {
    let token;
    const testEmail = "note@example.com";

    beforeEach(async () => {
        await User.deleteMany({ email: testEmail });
        await Note.deleteMany({}); 

        await request.post("/api/auth/register").send({
            name: "noteuser",
            email: testEmail,
            password: "123456",
        });

        const loginRes = await request.post("/api/auth/login").send({
            email: testEmail,
            password: "123456",
        });

        token = loginRes.body.accessToken;
    });

    after(async () => {
        await User.deleteMany({ email: testEmail });
    });

    it("should create a new note", async () => {
        const res = await request
            .post("/api/notes/create")
            .set("Authorization", `Bearer ${token}`) 
            .send({
                title: "Test Note",
                content: "Valid Content Here", // Content is now > 6 chars
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("note");
    });
    
    it("should fetch all notes for the user", async () => {
        const createRes = await request
            .post("/api/notes/create")
            .set("Authorization", `Bearer ${token}`) 
            .send({ 
                title: "Fetch Test", 
                content: "Content is long enough now" // FIX: Valid Content
            });
        
        expect(createRes.status).to.equal(201);
            
        const res = await request
            .get("/api/notes/fetch")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("notes");
        // This assertion should now pass since a note was successfully created
        expect(res.body.notes).to.be.an("array").that.is.not.empty;
    });

    
    describe("Note Modification and Deletion", () => {
        let noteId;
        beforeEach(async () => {
            const res = await request
                .post("/api/notes/create")
                .set("Authorization", `Bearer ${token}`) 
                .send({
                    title: "Note for update/delete",
                    content: "Fresh note content for modification",
                });
            
            noteId = res.body.note._id;
        });
        
        it("should update a note", async () => {
            const res = await request
                .put(`/api/notes/${noteId}`) // Uses the fresh noteId
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Updated Note",
                    content: "Updated content, which is also long enough",
                });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("updatedNote");
            expect(res.body.updatedNote.title).to.equal("Updated Note");
        });

        it("should delete a note", async () => {
            const res = await request
                .delete(`/api/notes/${noteId}`) // Uses the fresh noteId
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).to.equal(200);
            expect(res.body.message).to.match(/deleted/i);
        });
    });
});