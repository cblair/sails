import React, { useCallback } from "react";
import useFetch from 'use-http';

let csfr;

function setCSFR(newCSFR) {
  csfr = newCSFR;
}

export function getCSFR() {
  // TODO return csfr;
  return "dkCQt2dI-HWWorq-QGm616FUn9DFkgy_L1HE";
}

export default function AAA(props) {
  const { loading, error, data = { } } = useFetch('http://localhost:1337/csrfToken', {}, [])

  console.log("TS18", {data})

  return (
    <div meta={{ data }}>
      {props.children}
    </div>
  );
}