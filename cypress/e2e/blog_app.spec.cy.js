describe("Blog ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
    cy.contains("Bloglist app, Antti-Jussi Lakanen");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("aajii82");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("Antti-Jussi new (aajii82) logged in.");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("aajii82");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("add new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Cypress Ltd");
      cy.get("#url").type("www.cypress.com");
      cy.contains("save").click();
      cy.contains("a blog created by cypress");
    });
  });
});
