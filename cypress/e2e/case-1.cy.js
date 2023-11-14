describe("Case-1", () => {
  let username = "testUsername";

  it("Register User", () => {
    cy.visit("https://automationexercise.com/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", "https://automationexercise.com/login");

    cy.get(".signup-form > h2").should("have.text", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(username);
    cy.get('[data-qa="signup-email"]').type("testExercise@gmail.com");
    cy.get('[data-qa="signup-button"]').click();

    cy.url().should("eq", "https://automationexercise.com/signup");

    cy.get(".title.text-center > b").eq(0).should("be.visible");
    cy.get(".title.text-center > b ")
      .eq(0)
      .should("have.text", "Enter Account Information");

    cy.get("#id_gender1").check();

    cy.get('[data-qa="password"]').type("examplePasswordToChange");
    cy.get('[data-qa="days"]').select("1");
    cy.get('[data-qa="months"]').select("1");
    cy.get('[data-qa="years"]').select("2005");

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    cy.get('[data-qa="first_name"]').type("fistName");
    cy.get('[data-qa="last_name"]').type("lastName");
    cy.get('[data-qa="company"]').type("company");
    cy.get('[data-qa="address"]').type("address 33-223 23");
    cy.get('[data-qa="first_name"]').type("fistName");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("state");
    cy.get('[data-qa="city"]').type("city");
    cy.get('[data-qa="zipcode"]').type("33-223");
    cy.get('[data-qa="mobile_number"]').type("839483432");
    cy.get('[data-qa="create-account"]')
      .should("have.text", "Create Account")
      .click();

    cy.url().should("eq", "https://automationexercise.com/account_created");

    cy.get(".title.text-center > b").should("be.visible");
    cy.get(".title.text-center > b").should("have.text", "Account Created!");
    cy.get('[data-qa="continue-button"]')
      .should("have.text", "Continue")
      .click();
    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${username}`)
      .should("be.visible");
    cy.get(".nav.navbar-nav > li > a")
      .contains(" Delete Account")
      .should("be.visible")
      .click();

    cy.url().should("eq", "https://automationexercise.com/delete_account");
    cy.get(".title.text-center > b").should("be.visible");
    cy.get(".title.text-center > b").should("have.text", "Account Deleted!");
    cy.get('[data-qa="continue-button"]')
      .should("have.text", "Continue")
      .click();
  });
});
