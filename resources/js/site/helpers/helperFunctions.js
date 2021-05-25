Number.prototype.countDecimals = function() {
    const value = this.valueOf();
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
};

Number.prototype.hasDecimal = function() {
    return this.valueOf() % 1 != 0;
};

Number.prototype.withCommas = function() {
    return this.valueOf().toLocaleString('en-US');
};

module.exports.isEmpty = (value) => {
    return (value == '' || value === undefined || value === null || value === 0 || value === '0');
};

module.exports.getUrlParams = (url) => {
   let params = {};
   const parser = document.createElement('a');

   parser.href = url;

   const query = parser.search.substring(1);

   if (query != '') {
       const vars = query.split('&');

       for (var i = 0; i < vars.length; i++) {
           const pair = vars[i].split('=');
           params[pair[0]] = decodeURIComponent(pair[1]);
        }
    }

   return params;
};

module.exports.updateQueryStringParam = (param, value) => {
  baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
  urlQueryString = document.location.search;

  var newParam = key + '=' + value,
  params = '?' + newParam;

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    keyRegex = new RegExp('([\?&])' + key + '[^&]*');
    // If param exists already, update it
    if (urlQueryString.match(keyRegex) !== null) {
      params = urlQueryString.replace(keyRegex, "$1" + newParam);
    } else { // Otherwise, add it to end of query string
      params = urlQueryString + '&' + newParam;
    }
  }
  window.history.replaceState({}, "", baseUrl + params);
}
