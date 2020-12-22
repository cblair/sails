import React from "react";
import { Link, Route, Router, useHistory } from "react-router-dom";
import * as log from 'loglevel';

// Import all models with babel-plugin-wildcard.
import * as models from '../../../api/models';

import { useForm } from "react-hook-form";

function Field ({name, field}) {
  return <div>{name}</div>
}

function ModelToForm({modelName, fields}) {
  // history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = data => alert(data);

  return (
    <>
      <h1>{modelName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {Object.keys(fields).map((fieldName) => <Field name={fieldName} field={fields[fieldName]} />)}
      </form>
    </>
  );
}

export default class ModelsToForms {
  constructor() {
    this.models = new Map();
    Object.keys(models).forEach(modelKey => {
      const model = models[modelKey];
      this.models.set(modelKey, Object.assign({}, model.attributes, {path: modelKey.toLowerCase()}));
    });
    log.debug("Loaded sails models: ", {models}, "as", this.models);

    // Components
    this.forms = {};
    this.getModelList().forEach(({modelKey, model}) => this.forms[modelKey] = <ModelToForm modelName={modelKey} fields={model} />);
  }

  getFormFields(modelKey, model) {
    return Object.keys(model).map(fieldName => this.getFormField(fieldName, model[fieldName]));
  }

  getFormField(fieldName, field) {
    switch (field.type) {
      case "string":
        
    }
    return null;
  }

  getModelList() {
    let models = [];
    this.models.forEach((model, modelKey) => models.push({modelKey, model}));
    return models;
  }

  getLinks() {
    return this.getModelList().map(({modelKey, model: {path}}) => <Link to={`/${path}`}>{modelKey}</Link>);
  }

  getRoutes() {
    return this.getModelList().map(({modelKey, model: {path}}) => <Route path={`/${path}`}>{this.forms[modelKey]}</Route>);
  }
}