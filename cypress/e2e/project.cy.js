/// <reference types = "cypress" />

describe("CRUD Operations for a Books resource", () => {
    let bookId;

    //Test POST - Create a Book

it("Post/ create book request", async () => {
    const sampleBook = await cy.request({
        method: "POST",
        url:"/posts",
        headers:{
            Authorization: Cypress.env("token"),
        },

        body: {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        publishedYear: 1925,

        },
    });

    bookId = await sampleBook.body.id;  
    cy.log(bookId);
    
    expect(sampleBook.status).to.equal(201)
    expect(sampleBook.body.title).to.equal("The Great Gatsby")
    expect(sampleBook.body.author).to.equal("F. Scott Fitzgerald")
    expect(sampleBook.body.genre).to.equal("Classic")
    expect(sampleBook.body.publishedYear).to.equal(1925)

});         

// Test GET (Get a List of Books):

it("get book", async () => {
    const getBookRequest = await cy.request({
        method: "GET",
        url: "/posts",
        headers: {
            Authorization: Cypress.env("token"),
        },
    });
    expect(getBookRequest.status).to.equal(200);
    expect(getBookRequest.body).to.be.an("array");
});

// Test GET (Get a Single Book):
it("get a single book", async  () => {
    const response = await cy.request({
        method: "GET",
        url: `/posts/${bookId}`,
        headers: {
            Authorization: Cypress.env("token"),
        },
    });
    expect(response.status).to.equal(200);
//     expect(response.body.title).to.equal("The Great Gatsby");
//     expect(response.body.author).to.equal("F. Scott Fitzgerald");
//     expect(response.body.genre).to.equal("Classic");
//     expect(response.body.publishedYear).to.equal(1925);
// })

});

})