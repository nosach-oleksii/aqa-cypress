class UserSid {
  saveSidFromResponse(response) {
    expect(response.status).to.eq(201);
    const rawCookie = response.headers["set-cookie"];
    cy.log("Set-Cookie Header:", rawCookie);
    const sidMatch = /sid=([^;]+)/.exec(rawCookie?.[0] || "");
    cy.log("SID Match:", sidMatch);
    if (sidMatch && sidMatch[1]) {
      const sid = decodeURIComponent(sidMatch[1]);
      cy.setCookie("sid", sid);
      cy.wrap(sid).as("sid");
      const fileName = `cypress/fixtures/user_sid.json`;
      cy.writeFile(fileName, {
        sid: sid,
        userId: response.body.data.userId,
        time: new Date().toLocaleString("uk-UA"),
      });
      return sid;
    }
  }
}

export default new UserSid();
