require("../test-setup");
const User = require("../../src/models/User");

describe("User Model", () => {
  beforeAll(async () => {
    await User.syncIndexes();
  });

  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should fail if email is not unique", async () => {
    await User.create({ username: "user1", email: "dupe@test.com" });
    await expect(
      User.create({ username: "user2", email: "dupe@test.com" })
    ).rejects.toThrow();
  });

  it("should fail if username is not unique", async () => {
    await User.create({ username: "sameuser", email: "a@test.com" });
    await expect(
      User.create({ username: "sameuser", email: "b@test.com" })
    ).rejects.toThrow();
  });

  it("should fail if email format is invalid", async () => {
    await expect(
      User.create({ username: "user3", email: "notanemail" })
    ).rejects.toThrow();
  });

  it("should fail if profilePicture is not a valid URL", async () => {
    await expect(
      User.create({ username: "user4", email: "user4@test.com", profilePicture: "not-a-url" })
    ).rejects.toThrow();
  });

  it("should accept a valid profilePicture URL", async () => {
    const user = await User.create({
      username: "user5",
      email: "user5@test.com",
      profilePicture: "https://example.com/avatar.png",
    });
    expect(user.profilePicture).toBe("https://example.com/avatar.png");
  });
});
