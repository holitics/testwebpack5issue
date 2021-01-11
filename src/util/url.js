
// Convenience function for parsing of URL parameters
// based on http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam, sPageURL) {

  if (typeof sPageURL === "undefined") {
    sPageURL = window.location.search.substring(1);
  } else {
    if (sPageURL.indexOf("?")>=0) {
      sPageURL = sPageURL.split("?")[1];
    }
  }

  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      var res = sParameterName[1].replace(/\+/g, "%20");
      return decodeURIComponent(res);
    }
  }
}

export {
  getUrlParameter
};
