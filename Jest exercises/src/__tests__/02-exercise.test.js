/**
 * Write the assertions using the .toBe() matcher
 */
describe("02-exercises", () => {
  test("the variable `hello` is the same as 'hello-world'", () => {
    const hello = "hello-world";

    expect.assertions(1);

    // Finish the test
    expect("hello-world").toBe(hello);

  });
  test("the variable `hello` is not the same as 'hola-mundo'", () => {
    const hello = "hello-world";

    expect.assertions(1);

    // Finish the test
    expect("hola-mundo").not.toBe(hello);

  });
  test("user1 is the same as user2", () => {
    expect.assertions(1);

    const user1 = { name: "ana", phone: 678876567 };
    const user2 = user1;

    // Finish the test
    expect(Object.is(user1, user2)).toBe(true)

  });
  test("user1 is not the same as user3", () => {
    expect.assertions(1);

    const user1 = { name: "ana", phone: 678876567 };
    const user3 = { name: "ana", phone: 678876567 };

    // Finish the test
    expect(Object.is(user1, user3)).not.toBe(true)

  });
});
