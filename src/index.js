import "@babel/polyfill";

import "fhirclient";

//import {getUrlParameter} from "./util/url.js";
import React from "react";
import ReactDOM from "react-dom";
import * as FHIR from "fhirclient";


// update loading div
ReactDOM.render(<div id="loading">Page has Loaded</div>, document.getElementById("loading"));

