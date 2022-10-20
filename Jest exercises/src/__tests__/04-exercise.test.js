import {
  createUserObject,
  createCorporateEmailAddress,
  generateRandomNumberFrom1to10,
} from "../utils/matchers";

/**
 * Write the assertions using the most appropriate matcher
 */
describe("04-exercises", () => {
  test("createUserObject returns a user object with the right properties", () => {
    expect.assertions(3);

    const obj = createUserObject("Alex", "Spence", "alex@mail.com");

    expect(obj.firstName).toBeTruthy();
    expect(obj.lastName).toBeTruthy();
    expect(obj.email).toBeTruthy();

    /**
     * Write 3 assertions that check if executing the createUserObject function
     * with the following arguments:
     *
     * "Alex", "Spence", "alex@mail.com"
     *
     * returns an object with the following properties with a truthy value:
     *
     * firstName
     * lastName
     * email
     *
     * expect(obj.prop).toBeTruthy()
     *
     * @example
     * @tip
     * you can store the result of executing the function in a variable
     * to reuse the same function return value in differente assertions
     */

    // Write the assertions
  });

  test("createCorporateEmailAddress appends the corporate email domain", () => {
    expect.assertions(1);

    /**
     * Write an assertion using the `.toMatch()` matcher that the result
     * of executing the createCorporateEmailAddress function with an argument
     * of "dani" returns a string that includes the rest of the corporate
     * email address: "@company.com"
     */

     expect(createCorporateEmailAddress("dani")).toMatch("@company.com");

    // Write the assertion
  });

  test("generateRandomNumberFrom1to10 returns a number between 1 and 10", () => {
    expect.assertions(2);

    /**
     * Write 2 assertions to check that the generateRandomNumberFrom1to10 function
     * returns a number that is greater than 0 and lower than 11
     */

     expect(generateRandomNumberFrom1to10()).toBeGreaterThan(0);
     expect(generateRandomNumberFrom1to10()).toBeLessThan(11);

    // Write the assertions
  });
});
