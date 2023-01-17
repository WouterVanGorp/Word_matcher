import { describe, expect, test } from "@jest/globals";
import { printLine } from "../file.service";

describe("Main module", () => {
  test('printLine should always print wordoptions in format "segment1"+"segment2"="result"', () => {
    expect(
      printLine({ result: "foobartest", components: ["foo", "bar", "test"] })
    ).toBe("foo+bar+test=foobartest");
  });
});

// Obviously I would write more tests for all the other functions but due to time restrictions I only picked the printLine function (yes because it is the easiest to test ;) )
