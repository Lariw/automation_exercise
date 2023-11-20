describe("Case-1", () => {
  let userData = null;
  let mainData = null;
  let skipAddingCookies = true;
  let fileInput = "cypress/fixtures/inputFile.txt";

  beforeEach(() => {
    cy.fixture("userData.json").then((data) => {
      userData = data;
    });

    cy.fixture("mainData.json").then((data) => {
      mainData = data;
    });

    if (!skipAddingCookies) {
      cy.setCookies();
    }
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
  });

  it("Login User with correct email and password", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".login-form > h2").should("have.text", "Login to your account");
    cy.get('[data-qa="login-email"]').type(userData.email);
    cy.get('[data-qa="login-password"]').type(userData.passwd);
    cy.get('[data-qa="login-button"]').should("have.text", "Login").click();

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.saveCookies();
    skipAddingCookies = false;
  });

  it("Logout User", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");
    cy.get(".nav.navbar-nav > li > a ").contains(" Logout").click();

    cy.url().should("eq", mainData.baseURI + "/login");
    skipAddingCookies = true;
  });

  it("Login User with incorrect email and password", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".login-form > h2").should("have.text", "Login to your account");
    cy.get('[data-qa="login-email"]').type("abc" + userData.email);
    cy.get('[data-qa="login-password"]').type("abc" + userData.passwd);
    cy.get('[data-qa="login-button"]').should("have.text", "Login").click();

    cy.get("form > p")
      .contains("Your email or password is incorrect!")
      .should("be.visible");

    cy.url().should("eq", mainData.baseURI + "/login");
  });

  it("Delete user account", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".login-form > h2").should("have.text", "Login to your account");
    cy.get('[data-qa="login-email"]').type(userData.email);
    cy.get('[data-qa="login-password"]').type(userData.passwd);
    cy.get('[data-qa="login-button"]').should("have.text", "Login").click();

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.visit(mainData.baseURI + "/");

    cy.url().should("eq", mainData.baseURI + "/");

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

  it("Register User with existing email", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");
    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();
    cy.get(".signup-form > h2").should("have.text", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(userData.username);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get("form > p")
      .eq(0)
      .should("have.text", "Email Address already exist!");
  });

  it("Contact Us Form", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Contact us").click();

    cy.url().should("eq", mainData.baseURI + "/contact_us");
    cy.get(".title.text-center").contains("Get In Touch").should("be.visible");

    cy.get('[data-qa="name"]').type(userData.username);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type("Lorem Ipsum");
    cy.get('[data-qa="message"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt augue ex, sed pretium lectus ornare a. Duis efficitur elit at massa dictum, in scelerisque urna sodales. Maecenas vitae imperdiet erat. Ut condimentum blandit mauris non bibendum."
    );
    cy.get('[name="upload_file"]').selectFile(fileInput);

    cy.get('[data-qa="submit-button"]').click();

    cy.get(".status.alert.alert-success").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );

    cy.get("#form-section > a").should("have.text", " Home").click();

    cy.url().should("eq", mainData.baseURI + "/");
  });

  it("Verify Products and product detail page", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();

    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get(".features_items").should("be.visible");

    cy.get(".choose").eq(0).click();

    cy.url().should("eq", mainData.baseURI + "/product_details/1");

    cy.get(".product-information > h2").should("be.visible");
    cy.get(".product-information > p")
      .contains("Category")
      .should("be.visible");
    cy.get(".product-information > p")
      .contains("Availability:")
      .should("be.visible");
    cy.get(".product-information > p")
      .contains("Condition:")
      .should("be.visible");
    cy.get(".product-information > p").contains("Brand:").should("be.visible");

    cy.get(".product-information > span > span")
      .contains("Rs.")
      .should("be.visible");
  });

  it("Search Product.", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get("#search_product").type("Top");
    cy.get("#submit_search").click();

    cy.url().should("eq", mainData.baseURI + "/products?search=Top");

    cy.get(".features_items > .title.text-center").should("be.visible");
    cy.get(".features_items > .title.text-center").should(
      "have.text",
      "Searched Products"
    );

    cy.get(".productinfo.text-center > p").each((element) => {
      const elementDesc = element.text();
      expect(elementDesc).to.include("Top");
    });
  });

  it("Verify Subscription in home page.", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get("#susbscribe_email").scrollIntoView();

    cy.get("#susbscribe_email").type(userData.email);
    cy.get("#subscribe").click();

    cy.get(".alert-success.alert").should("be.visible");
    cy.get(".alert-success.alert").should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });

  it("Verify Subscription in Cart page", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();
    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".single-widget > h2").should("be.visible");

    cy.get("#susbscribe_email").type(userData.email);
    cy.get("#subscribe").click();

    cy.get(".alert-success.alert").should("be.visible");
    cy.get(".alert-success.alert").should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });

  it("Add Products in Cart", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");

    let prices = [];
    let names = [];

    cy.get(".productinfo.text-center")
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(0).click();

    cy.get('[data-dismiss="modal"]').click();

    cy.get(".productinfo.text-center")
      .eq(1)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(1).click();

    cy.get("a > u").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });
  });

  it("Verify Product quantity in Cart", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    cy.get('.productinfo.text-center >[data-product-id="7"]').scrollIntoView();
    cy.get('li > [href="/product_details/7"]').click();
    cy.get("#quantity").clear().type("4");
    cy.get("button").contains("Add to cart").click();

    cy.get("p > a > u").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_quantity > button").should("have.text", "4");
  });

  it("Place Order: Register while Checkout", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get("section").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("footer").should("be.visible");

    let prices = [];
    let names = [];

    cy.get(".productinfo.text-center")
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(0).click();

    cy.get('[data-dismiss="modal"]').click();

    cy.get(".productinfo.text-center")
      .eq(1)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(1).click();

    cy.get('[href="/view_cart"] > u').click();
    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".check_out").contains("Proceed To Checkout").click();
    cy.get('[href="/login"] > u').contains("Register / Login").click();

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

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();
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

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.get('[href="/payment"]').contains("Place Order").click();

    cy.url().should("eq", mainData.baseURI + "/payment");

    cy.get('[data-qa="name-on-card"]').type(userData.payment.cardName);

    cy.get('[data-qa="card-number"]').type(userData.payment.cardNumber);

    cy.get('[data-qa="cvc"]').type(userData.payment.cvc);

    cy.get('[data-qa="expiry-month"]').type(userData.payment.expirationM);

    cy.get('[data-qa="expiry-year"]').type(userData.payment.expirationY);

    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();

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

  it("Place Order: Register before Checkout", () => {
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

    let prices = [];
    let names = [];

    cy.get(".productinfo.text-center")
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(0).click();

    cy.get('[data-dismiss="modal"]').click();

    cy.get(".productinfo.text-center")
      .eq(1)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(1).click();

    cy.get('[href="/view_cart"] > u').click();
    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

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

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.get('[href="/payment"]').contains("Place Order").click();

    cy.url().should("eq", mainData.baseURI + "/payment");

    cy.get('[data-qa="name-on-card"]').type(userData.payment.cardName);

    cy.get('[data-qa="card-number"]').type(userData.payment.cardNumber);

    cy.get('[data-qa="cvc"]').type(userData.payment.cvc);

    cy.get('[data-qa="expiry-month"]').type(userData.payment.expirationM);

    cy.get('[data-qa="expiry-year"]').type(userData.payment.expirationY);

    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();

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

  it("Place Order: Login before Checkout", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".login-form > h2").should("have.text", "Login to your account");
    cy.get('[data-qa="login-email"]').type(userData.email);
    cy.get('[data-qa="login-password"]').type(userData.passwd);
    cy.get('[data-qa="login-button"]').should("have.text", "Login").click();

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    let prices = [];
    let names = [];

    cy.get(".productinfo.text-center")
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(0).click();

    cy.get('[data-dismiss="modal"]').click();

    cy.get(".productinfo.text-center")
      .eq(1)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(1).click();

    cy.get('[href="/view_cart"] > u').click();
    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

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

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.get('[href="/payment"]').contains("Place Order").click();

    cy.url().should("eq", mainData.baseURI + "/payment");

    cy.get('[data-qa="name-on-card"]').type(userData.payment.cardName);

    cy.get('[data-qa="card-number"]').type(userData.payment.cardNumber);

    cy.get('[data-qa="cvc"]').type(userData.payment.cvc);

    cy.get('[data-qa="expiry-month"]').type(userData.payment.expirationM);

    cy.get('[data-qa="expiry-year"]').type(userData.payment.expirationY);

    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();

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
