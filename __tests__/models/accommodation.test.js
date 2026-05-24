require("../test-setup");
const Accommodation = require("../../src/models/Accommodation");
const User = require("../../src/models/User");

describe("Accommodation Model", () => {
  it("should create an accommodation with all required fields", async () => {
    const accommodation = await Accommodation.create({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sweden",
      zipCode: "11122",
      rent: 8000,
      rooms: 2,
    });

    expect(accommodation).toBeDefined();
    expect(accommodation.address).toBe("Storgatan 1");
    expect(accommodation.city).toBe("Stockholm");
    expect(accommodation.country).toBe("Sweden");
    expect(accommodation.zipCode).toBe("11122");
    expect(accommodation.rent).toBe(8000);
    expect(accommodation.rooms).toBe(2);
  });

  it("should fail without required fields", async () => {
    await expect(Accommodation.create({ city: "Stockholm" })).rejects.toThrow();
  });

  it("should fail if rent is negative", async () => {
    await expect(
      Accommodation.create({
        address: "Storgatan 1",
        city: "Stockholm",
        country: "Sweden",
        zipCode: "11122",
        rent: -100,
        rooms: 2,
      })
    ).rejects.toThrow();
  });

  it("should fail if rooms is less than 1", async () => {
    await expect(
      Accommodation.create({
        address: "Storgatan 1",
        city: "Stockholm",
        country: "Sweden",
        zipCode: "11122",
        rent: 5000,
        rooms: 0,
      })
    ).rejects.toThrow();
  });

  it("should store userId reference", async () => {
    const user = await User.create({ username: "landlord", email: "landlord@test.com" });
    const accommodation = await Accommodation.create({
      address: "Kungsgatan 5",
      city: "Göteborg",
      country: "Sweden",
      zipCode: "41101",
      rent: 9500,
      rooms: 3,
      userId: user._id,
    });

    expect(accommodation.userId.toString()).toBe(user._id.toString());
  });

  it("should CASCADE delete accommodations when user is deleted", async () => {
    const user = await User.create({ username: "tenant", email: "tenant@test.com" });

    await Accommodation.create({
      address: "Vasagatan 10",
      city: "Malmö",
      country: "Sweden",
      zipCode: "21120",
      rent: 7000,
      rooms: 1,
      userId: user._id,
    });

    await User.findByIdAndDelete(user._id);

    const remaining = await Accommodation.find({ userId: user._id });
    expect(remaining).toHaveLength(0);
  });
});
