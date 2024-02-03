import { Given, When, Then } from 'cucumber';
import * as assert from 'assert';

let myFleet: string[] = [];
let vehicle: string;
let parkedLocation: string | null = null;
let message: string | null = null;

Given('my fleet', function () {
  myFleet = [];
});

Given('a vehicle', function () {
  vehicle = "000";
});

Given('I have registered this vehicle into my fleet', function () {
  myFleet.push(vehicle);
});

Given('a location', function () {
  // You can implement logic to generate a location here if needed
});

When('I park my vehicle at this location', function () {
  parkedLocation = 'Sample Location'; // Sample implementation, you can replace it with actual logic to set the parked location
});

When('I try to park my vehicle at this location', function () {
  if (parkedLocation === 'Sample Location') {
    message = "My vehicle is already parked at this location";
  }
});

Then('the known location of my vehicle should verify this location', function () {
  assert.strictEqual(parkedLocation, 'Sample Location'); // Sample implementation, you can replace it with actual logic to verify the location
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.strictEqual(message, "My vehicle is already parked at this location");
});