import React from "react";

import AAA from "./aaa";
import { FormRouter } from "./modelsToForms/index.js";

export default function App () {
  console.log("TS11", FormRouter)
  return (
    <>
      <AAA>
        <FormRouter />
      </AAA>
    </>
  );
};
