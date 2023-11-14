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
