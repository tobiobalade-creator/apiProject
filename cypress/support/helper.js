// export const setup = async () => {
//     const createBookRequest = await cy.request({
//         method: "POST",
//         url:"/public/v1/users",
//         headers:{
//             Authorization: Cypress.env("token"),
//         },

//         body: {
//         title: "The Great Gatsby",
//         author: "F. Scott Fitzgerald",
//         genre: "Classic",
//         publishedYear: 1925,

//         },
//         });

//         return createBookRequest;
//     }