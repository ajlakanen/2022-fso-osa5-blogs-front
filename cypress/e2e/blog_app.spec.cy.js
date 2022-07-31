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
    cy.get("input:first").type("aajii82");
    cy.get("input:last").type("password");
  });
});
