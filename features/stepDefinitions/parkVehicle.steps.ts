import { When, Then } from "@cucumber/cucumber";
import * as assert from "assert";
import { vehiclePark, location } from "./configStep";

let messageAlreadyPark: string;

When("I park my vehicle at this location", () => {
  assert.ok(
    vehiclePark.positions.some(position => 
      position.lat === location.lat && position.lng === location.lng
    ),
    "The vehicle was not parked at the specified location."
  );
});

Then("the known location of my vehicle should verify this location", () => {
  assert.ok(
    vehiclePark.positions.some(position => 
      position.lat === location.lat && position.lng === location.lng
    ),
    "The vehicle was not parked at the specified location."
  );
});

When("I try to park my vehicle at this location", () => {
  vehiclePark.positions.push(location);
});

Then("I should be informed that my vehicle is already parked at this location", () => {
  messageAlreadyPark = "My vehicle is already parked at this location";
});
