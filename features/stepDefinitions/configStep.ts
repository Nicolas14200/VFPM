import { Given } from "cucumber";

export let myFleetRegister: string[];
export let myFleetPark: string[];
export let anotherUserFleetRegister: string[];

export let vehicleRegister: {
  positions: [];
  vehiclePlateNumber: string;
};
export let vehiclePark: {
  positions: Location[];
  vehiclePlateNumber: string;
};

export type Location = {
  lat: number;
  lng: number;
};
export let location: Location;

Given("my fleet", () => {
  myFleetRegister = [];
  myFleetPark = [];
});

Given("a vehicle", () => {
  vehicleRegister = {
    positions: [],
    vehiclePlateNumber: "PLAT3NU8ER01",
  };
  vehiclePark = {
    positions: [{
      lat: 10,
      lng: 10,
    }],
    vehiclePlateNumber: "PLAT3NU8ER02",
  };
});

Given("the fleet of another user", () => {
  anotherUserFleetRegister = [];
});

Given("a location", function () {
  location = {
    lat: 10,
    lng: 10,
  };
});
Given("I have registered this vehicle into my fleet", () => {
  myFleetPark.push(vehiclePark.vehiclePlateNumber);
});
Given("my vehicle has been parked into this location", () => {
  vehiclePark.positions.push(location);
});
Given("this vehicle has been registered into the other user's fleet", () => {
  anotherUserFleetRegister.push(vehiclePark.vehiclePlateNumber);
});
