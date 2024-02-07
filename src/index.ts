#!/usr/bin/env node
import "reflect-metadata";
import { AppDependencies } from "./app/config/AppDependencies";

new AppDependencies().init().then(() => {
  console.log("Application initialized and ready");
});
