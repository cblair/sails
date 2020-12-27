
import React from "react";
import { useForm } from "react-hook-form";

// import * as reactProf2 from "babel-plugin-react-prof";

function Field ({name, field, register}) {
  let fieldComponent = null;
  switch (field.type) {
    case "string":
      fieldComponent = <div>{name}: <input name={name} ref={register} ></input></div>;
      break;
    case "number":
      fieldComponent = <div>{name}: <input name={name} type="number" ref={register} ></input></div>;
      break;
    case "boolean":
      fieldComponent = <div>{name}: <input name={name} type="checkbox" ref={register} ></input></div>;
      break;
    default:
      fieldComponent = <div>TODO: {name}, type: {field.type}</div>;
  }
  return fieldComponent;
}

export default function ModelToForm({modelName, fields}) {
  // history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = data => alert(JSON.stringify(data));

  return (
    <>
      <h1>{modelName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(fields).map((fieldName) => <Field name={fieldName} field={fields[fieldName]} register={register} />)}
        <input type="submit" />
      </form>
    </>
  );
}