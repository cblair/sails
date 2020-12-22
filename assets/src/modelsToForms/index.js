import React from "react";
import { Link, Route, Router, useHistory } from "react-router-dom";
import * as log from 'loglevel';
import { omit } from "lodash";

// Import all models with babel-plugin-wildcard.
import * as models from '../../../api/models';

import ModelToForm from "../modelToForm.js";

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
    this.getModelList().forEach(({modelKey, model}) => this.forms[modelKey] = <ModelToForm modelName={modelKey} fields={omit(model, "path")} />);

    // console.log("TS24", {reactProf})
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
