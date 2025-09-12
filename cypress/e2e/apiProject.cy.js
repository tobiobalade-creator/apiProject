/// <reference types = "cypress" />

describe("User Management System", () => {
let userId = 2;

// Retrieve All Users (GET Request)
it("Get/ retrieve all users", async () => {
    const response = await cy.request({
        method: "GET",
        url: "/users?page=2",
        headers: {
            "x-api-key":Cypress.env("api-key"),
        }
        
    })
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("data");
    expect(response.body).to.have.property("page");
    expect(response.body).to.have.property("per_page");
    expect(response.body.page).to.equal(2);
})

// Retrieve a Specific User (GET Request)

it("Get/ retrieve a specific user", async () => {
    const response = await cy.request({
        method: "GET",
        url: "/users/?id=2",
        headers: {
            "x-api-key":Cypress.env("api-key"),
        }
    })
    expect(response.status).to.equal(200);
    expect(response.body.data).to.have.property("id");
    expect(response.body.data).to.have.property("email");
    expect(response.body.data).to.have.property("first_name");
    expect(response.body.data.id).to.equal(2);

    const {first_name, last_name } = response.body.data;
    cy.log(`User's full name is :${first_name} ${last_name}`);
    console.log(`User's full name is : ${first_name} ${last_name}`);
})

//  Create a New User (POST Request)

it("Post/ a New User Request", async () => {
    const response = await cy.request ({
        method: "POST",
        url: "/users",
        headers: {
           "x-api-key":Cypress.env("api-key"),
        },
        
        body: {
            name: "John Doe",
            job: "Software Developer",
}
    })
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
    expect(response.body).to.have.property("job");
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.equal("John Doe");

})

// Update User Details (PUT Request)

it("Put/ update User Details", async () => {
    const response = await cy.request({
        method:"PUT",
        url: "/users/?id=2",
        headers: {
           "x-api-key":Cypress.env("api-key"),
        },
        body: {
            job: "Team Lead",
        }

    })
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("job", "Team Lead");
    expect(response.body).to.have.property('updatedAt');
      const updatedAt = response.body.updatedAt;
          expect(new Date(updatedAt).toString()).not.to.equal('Invalid Date');
})

// Delete a User (DELETE Request)

it("Delete a user", async () => {
    const response = await cy.request ({
        method: "DELETE",
        url: "/users/?id=2",
        headers: {
           "x-api-key":Cypress.env("api-key"),
        },
    })
    expect(response.status).to.equal(204);
    expect(response.body).to.equal("");
})

// Bonus Tasks- unsure how to get both tests to pass 
// Error handling 

it("fetch non-existent user", async () => {
    const response = await cy.request ({
        method: "GET",
        url: "/users/999",
        headers: {
            "x-api-key":Cypress.env("api-key"),
        }
     
    })
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.match(/not found/i);
})

// Performance Testing

it("measures and asserts response time for a request", async () => {
    const response = cy.request({
        method: "GET",
        url: `/users/1`,
        headers: {
            "x-api-key":Cypress.env("api-key"),
        }
    })
    const responseTime = response.duration;
    cy.log(`Response time: ${responseTime} ms`);
    expect(responseTime).to.be.lessThan(500);
})
})