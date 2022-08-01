describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Antero-Jaakko Liukanen",
      username: "aajii",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
    cy.contains("Bloglist app, Antti-Jussi Lakanen");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("aajii");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should(
      "not.contain",
      "Antero-Jaakko Liukanen (aajii) logged in."
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("aajii");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("Antero-Jaakko Liukanen (aajii) logged in.");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("aajii");
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

    it("second blog can be created", function () {
      cy.contains("add new blog").click();
      cy.get("#title").type("yet another blog created by cypress");
      cy.get("#author").type("Cypress Ltd numer 2");
      cy.get("#url").type("www.cypress.com");
      cy.contains("save").click();
      cy.contains("yet another blog created by cypress");
    });
  });
});
