import { Given, When, Then } from 'cucumber';
import * as assert from 'assert';

let myFleet: any[] = [];
let anotherUserFleet: any[] = [];
let vehicle: any = null;
let message: string | null = null;

Given('my fleet', function () {
  myFleet = [];
});

Given('a vehicle', function () {
  vehicle = {};
});

When('I register this vehicle into my fleet', function () {
  myFleet.push(vehicle);
});

Then('this vehicle should be part of my vehicle fleet', function () {
  assert.ok(myFleet.includes(vehicle));
});

Given('I have registered this vehicle into my fleet', function () {
  myFleet.push(vehicle);
});

When('I try to register this vehicle into my fleet', function () {
  if (myFleet.includes(vehicle)) {
    message = "This vehicle has already been registered into my fleet";
  }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual(message, "This vehicle has already been registered into my fleet");
});

Given('the fleet of another user', function () {
  anotherUserFleet = [];
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
  anotherUserFleet.push(vehicle);
});

Then('this vehicle should be part of my vehicle fleet', function () {
  assert.ok(myFleet.includes(vehicle));
});
