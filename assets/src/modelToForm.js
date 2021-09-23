
import React from "react";
import { useForm } from "react-hook-form";
import useFetch from 'use-http';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { getCSFR } from "./aaa";

const schema = yup.object().shape({});

function Field ({name, field, register}) {
  console.log({field})
  let fieldComponent = null;
  switch (field.type) {
    case "string":
      fieldComponent = <><div>{name}:</div><div> <input name={name} ref={register} ></input></div></>;
      break;
    case "number":
      fieldComponent = <><div>{name}:</div><div> <input name={name} type="number" ref={register} ></input></div></>;
      break;
    case "boolean":
      fieldComponent = <><div>{name}:</div><div> <input name={name} type="checkbox" ref={register} ></input></div></>;
      break;
    default:
      fieldComponent = <div>TODO: {name}, type: {field.type}</div>;
  }
  return fieldComponent;
}

export default function ModelToForm({modelName, fields}) {
  // TODO - define API endpoint in api.js
  const { post, loading, error, data = { } } = useFetch("http://localhost:1337", {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  // Set fields' schemas for the main form.
  Object.keys(fields).forEach((fieldName) => schema[fieldName] = {required: !!fields[fieldName].required})

  console.log("TS42", {schema})

  const { register, handleSubmit } = useForm({resolver: yupResolver(schema)});

  const onSubmit = data => {
    console.log("TS33", data, {csrf: getCSFR()})
    post(modelName.toLowerCase(), Object.assign({}, data, {csrf: getCSFR()}));
  };

  return (
    <>
      <h1>{modelName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{
          display: "grid",
          "grid-template-columns": "50% 50%",
        }}>
          {Object.keys(fields).map((fieldName) => <Field name={fieldName} field={fields[fieldName]} register={register} />)}
        </div>
        <input type="submit" />
      </form>
    </>
  );
}