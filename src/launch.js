import "@babel/polyfill";

import {getUrlParameter} from "./util/url.js";

var launchContextId = getUrlParameter("launch");

console.log("launchContextId:", launchContextId);


window.location.href="http://localhost:3005/index";
