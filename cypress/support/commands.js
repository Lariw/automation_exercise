Cypress.Commands.add("saveCookies", () => {
  cy.then(() => {
    cy.getCookies().then((cookies) => {
      cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(cookies));
    });
  });
});

Cypress.Commands.add("setCookies", () => {
  cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
    cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });
  });
});

Cypress.Commands.add("pageLoadVerification", () => {
  cy.get("section").should("be.visible");
  cy.get("header").should("be.visible");
  cy.get("footer").should("be.visible");
});

Cypress.Commands.add("userRegistration", (userData, mainData) => {
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
  cy.get('[data-qa="continue-button"]').should("have.text", "Continue").click();

  cy.get(".nav.navbar-nav > li > a")
    .contains(` Logged in as ${userData.username}`)
    .should("be.visible");
});

Cypress.Commands.add("userPayments", (userData, mainData) => {
  cy.get('[href="/payment"]').contains("Place Order").click();

  cy.url().should("eq", mainData.baseURI + "/payment");

  cy.get('[data-qa="name-on-card"]').type(userData.payment.cardName);

  cy.get('[data-qa="card-number"]').type(userData.payment.cardNumber);

  cy.get('[data-qa="cvc"]').type(userData.payment.cvc);

  cy.get('[data-qa="expiry-month"]').type(userData.payment.expirationM);

  cy.get('[data-qa="expiry-year"]').type(userData.payment.expirationY);

  cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();
});

Cypress.Commands.add("checkoutVerification", (userData, mainData) => {
  cy.get(".check_out").contains("Proceed To Checkout").click();
  cy.url().should("eq", mainData.baseURI + "/checkout");

  cy.get("#address_delivery > .address_firstname.address_lastname").should(
    "contain.text",
    userData.firstName
  );
  cy.get("#address_delivery > .address_firstname.address_lastname").should(
    "contain.text",
    userData.lastName
  );
  cy.get("#address_delivery > .address_address1.address_address2")
    .eq(0)
    .should("have.text", userData.company);
  cy.get("#address_delivery > .address_address1.address_address2")
    .eq(1)
    .should("contain.text", userData.address);
  cy.get(
    "#address_delivery > .address_city.address_state_name.address_postcode"
  ).should("contain.text", userData.city);
  cy.get(
    "#address_delivery > .address_city.address_state_name.address_postcode"
  ).should("contain.text", userData.state);
  cy.get(
    "#address_delivery > .address_city.address_state_name.address_postcode"
  ).should("contain.text", userData.zipcode);
  cy.get("#address_delivery > .address_country_name").should(
    "have.text",
    userData.country
  );
  cy.get("#address_delivery > .address_phone").should(
    "have.text",
    userData.mobileNumber
  );
});
