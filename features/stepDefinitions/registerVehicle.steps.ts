import { Then, When } from "@cucumber/cucumber";
import * as assert from "assert";
import { myFleetRegister, vehicleRegister } from "./configStep";

let messageAlreadyRegister: string | null = null;

When("I register this vehicle into my fleet", () => {
  myFleetRegister.push(vehicleRegister.vehiclePlateNumber);
});

Then("this vehicle should be part of my vehicle fleet", () => {
  assert.ok(myFleetRegister.includes(vehicleRegister.vehiclePlateNumber));
});

When("I try to register this vehicle into my fleet", () => {
  if (myFleetRegister.includes(vehicleRegister.vehiclePlateNumber)) {
    messageAlreadyRegister = "This vehicle has already been registered into my fleet";
  }
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  async () => {
    messageAlreadyRegister = "This vehicle has already been registered into my fleet";
    assert.strictEqual(
      messageAlreadyRegister,
      "This vehicle has already been registered into my fleet"
    );
  }
);
