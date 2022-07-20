import app from "../../src/app";

describe("'entities' service", () => {
  it("registered the service", () => {
    const service = app.service("api/entity");
    expect(service).toBeTruthy();
  });
});
