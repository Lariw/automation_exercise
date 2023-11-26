describe("Case-1", () => {
  const path = require("path");

  let userData = null;
  let mainData = null;
  let skipAddingCookies = true;
  let fileInput = "cypress/fixtures/inputFile.txt";

  before(() => {
    cy.fixture("userData.json").then((data) => {
      userData = data;
    });

    cy.fixture("mainData.json").then((data) => {
      mainData = data;
    });
  });

  beforeEach(() => {
    if (!skipAddingCookies) {
      cy.setCookies();
    }
  });

  it("Register User", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);
  });

  it("Register User with existing email", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();
    cy.get(".signup-form > h2").should("have.text", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(userData.username);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get("form > p")
      .eq(0)
      .should("have.text", "Email Address already exist!");
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

  it("Contact Us Form", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.pageLoadVerification();

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

    cy.userRegistration(userData, mainData);

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();
    cy.checkoutVerification(userData, mainData);

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.userPayments(userData, mainData);

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

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);

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

    cy.checkoutVerification(userData, mainData);

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.userPayments(userData, mainData);
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

    cy.checkoutVerification(userData, mainData);

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });

    cy.get(".form-control").type("Lorem ipsum dolor sodoles.");

    cy.userPayments(userData, mainData);
  });

  it("Remove Products From Cart", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

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

    cy.get(".cart_quantity_delete").eq(0).click();
    cy.wait(1000);
    cy.get(".cart_quantity_delete").eq(0).click();
  });

  it("View Category Products", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".left-sidebar > h2").contains("Category").should("be.visible");

    cy.get(".panel-title > a").contains("Women").click();

    cy.get(".panel-body > ul > li ").contains("Dress").click();

    cy.get(".title.text-center")
      .contains("Women - Dress Products")
      .should("exist");

    cy.get(".left-sidebar > h2").contains("Category").should("be.visible");

    cy.get(".panel-title > a").contains("Men").click();

    cy.get(".panel-body > ul > li ").contains("Tshirts").click();

    cy.get(".title.text-center")
      .contains("Men - Tshirts Products")
      .should("exist");
  });

  it("View & Cart Brand Products", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();

    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get(".left-sidebar > .brands_products > h2")
      .contains("Brands")
      .should("be.visible");

    cy.get(".brands-name > ul > li > a").contains("Polo").click();

    cy.get(".title.text-center").should("have.text", "Brand - Polo Products");

    cy.get(".brands-name > ul > li > a").contains("Allen Solly Junior").click();

    cy.get(".title.text-center").should(
      "have.text",
      "Brand - Allen Solly Junior Products"
    );
  });

  it("Search Products and Verify Cart After Login", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");
    cy.get(".title.text-center").should("have.text", "All Products");

    cy.get("#search_product").type("Sleeveless Dress");
    cy.get("#submit_search").click();

    cy.url().should(
      "eq",
      mainData.baseURI + "/products?search=Sleeveless%20Dress"
    );

    cy.get(".features_items").should("be.visible");

    cy.get(
      ".features_items > .col-sm-4 > .product-image-wrapper > .single-products > .productinfo.text-center > p"
    ).should("have.text", "Sleeveless Dress");

    cy.get(".btn.btn-default.add-to-cart").eq(0).click({ force: true });

    cy.get("a > u").contains("View Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_description > h4 > a").should(
      "have.text",
      "Sleeveless Dress"
    );

    cy.get(".btn.btn-default.check_out").click();

    cy.get("a > u").contains("Register / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.get(".login-form > h2").should("have.text", "Login to your account");
    cy.get('[data-qa="login-email"]').type(userData.email);
    cy.get('[data-qa="login-password"]').type(userData.passwd);
    cy.get('[data-qa="login-button"]').should("have.text", "Login").click();
    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_description > h4 > a").should(
      "have.text",
      "Sleeveless Dress"
    );

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

  it("Add review on product", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");
    cy.get(".title.text-center").should("have.text", "All Products");

    cy.get(".choose > ul > li > a").eq(0).click();

    cy.get(".active > a").should("have.text", "Write Your Review");

    cy.get("#name").type(userData.username);
    cy.get("#email").type(userData.email);
    cy.get("#review").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );

    cy.get("#button-review").click();

    cy.get(".alert-success.alert > span").should(
      "have.text",
      "Thank you for your review."
    );
  });

  it("Add to cart from Recommended items", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get("#recommended-item-carousel").scrollIntoView();

    let prices = [];
    let names = [];

    cy.get(
      "#recommended-item-carousel >.carousel-inner > .item.active > div > div > div > div"
    )
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(
      "#recommended-item-carousel >.carousel-inner > .item.active > div > div > div > div > a"
    )
      .eq(0)
      .click();

    cy.get("a > u").contains("View Cart").click();

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
    });
  });

  it("Verify address details in checkout page", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);

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

    cy.get(".productinfo.text-center > a").contains("Add to cart").click();

    cy.get("a > u").contains("View Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
    });

    cy.checkoutVerification(userData, mainData);

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

  it("Download Invoice after purchase order", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);

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

    cy.get(".productinfo.text-center > a").contains("Add to cart").click();

    cy.get("a > u").contains("View Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
    });

    cy.checkoutVerification(userData, mainData);

    cy.get('[name="message"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt augue ex, sed pretium lectus ornare a. Duis efficitur elit at massa dictum, in scelerisque urna sodales. Maecenas vitae imperdiet erat. Ut condimentum blandit mauris non bibendum."
    );

    cy.userPayments(userData, mainData);

    cy.get("div > a").contains("Download Invoice").click();

    cy.wait(2000);

    cy.readFile("cypress\\Downloads\\invoice.txt");

    cy.get(".pull-right > a").contains("Continue").click();

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
