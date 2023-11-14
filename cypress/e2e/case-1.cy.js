describe("Case-1", () => {
  let userData;
  let mainData;

  beforeEach(() => {
    cy.fixture("userData.json").then((data) => {
      userData = data;
    });

    cy.fixture("mainData.json").then((data) => {
      mainData = data;
    });
  });

  it("Register User", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".signup-form > h2").should("have.text", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(userData.username);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.url().should("eq", mainData.baseURI + "/signup");

    cy.get(".title.text-center > b").eq(0).should("be.visible");
    cy.get(".title.text-center > b ")
      .eq(0)
      .should("have.text", "Enter Account Information");

    if (userData.gender === "male") {
      cy.get("#id_gender1").check();
    } else if (userData.gender === "female") {
      cy.get("#id_gender2").check();
    } else {
      throw new Error("Invalid gender value in userData.json");
    }

    cy.get('[data-qa="password"]').type(userData.passwd);

    cy.then(() => {
      const [day, month, year] = userData.birthDate.split(".");

      cy.get('[data-qa="days"]').select(day);
      cy.get('[data-qa="months"]').select(month);
      cy.get('[data-qa="years"]').select(year);
    });

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    cy.get('[data-qa="first_name"]').type(userData.firstName);
    cy.get('[data-qa="last_name"]').type(userData.lastName);
    cy.get('[data-qa="company"]').type(userData.company);
    cy.get('[data-qa="address"]').type(userData.address);
    cy.get('[data-qa="first_name"]').type(userData.firstName);
    cy.get('[data-qa="country"]').select(userData.country);
    cy.get('[data-qa="state"]').type(userData.state);
    cy.get('[data-qa="city"]').type(userData.city);
    cy.get('[data-qa="zipcode"]').type(userData.zipcode);
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber);
    cy.get('[data-qa="create-account"]')
      .should("have.text", "Create Account")
      .click();

    cy.url().should("eq", mainData.baseURI + "/account_created");

    cy.get(".title.text-center > b").should("be.visible");
    cy.get(".title.text-center > b").should("have.text", "Account Created!");
    cy.get('[data-qa="continue-button"]')
      .should("have.text", "Continue")
      .click();
    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");
    cy.get(".nav.navbar-nav > li > a")
      .contains(" Delete Account")
      .should("be.visible")
      .click();

    cy.url().should("eq", mainData.baseURI + "/delete_account");
    cy.get(".title.text-center > b").should("be.visible");
    cy.get(".title.text-center > b").should("have.text", "Account Deleted!");
    cy.get('[data-qa="continue-button"]')
      .should("have.text", "Continue")
      .click();
  });
});
