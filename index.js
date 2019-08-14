'use strict';

/*
TODO
- Add ability to give a filename opposed to a Json string/object
- Add exact/partial match types and return type of match to array
*/

/**
 * Searches a json object and finds relevant info
 * @param {json} object             //json object to search
 * @param {needle} string           //string to find
 * @param {ignoreCase} boolean      //ignore case when searching
 * @param {searchType} integer      //match kays or values or both: 0 = any, 1 = keys only, 2 = values only
 * @param {pathSeparator} string    //separator between path elements e.g. ' > ', '.', '/'
 * @return {array}
 */
module.exports = function(json, needle, ignoreCase = true, searchType = 0, pathSeparator = '.') {
  let results = [];

  if (typeof json === "string") { 
    try {
      json = JSON.parse(json);
    } catch (e) {
      json = [];
    }
  }

  const deepDive = function(json, needle, currentPathIn = '') {
    let diveResults = [];

    for (const o in json) {
      const currentPath = (currentPathIn == '')  ? o : currentPathIn + pathSeparator + o;

      if (typeof json[o] === "object") {
        let diveResult = deepDive(json[o], needle, currentPath);
        if (diveResult.length !== 0) { 
          diveResults.push( diveResult );
        }
      } else {
        let checkval;
  
        if (searchType == 0 || searchType == 1) {
          checkval = (ignoreCase) ? o.toString().toLowerCase() : o;
          if (checkval.indexOf(needle) >= 0) diveResults.push( [ "key", currentPath ] );
        }
  
        if (searchType == 0 || searchType == 2) {
          checkval = (ignoreCase) ? json[o].toString().toLowerCase() : json[o];
          if (checkval.indexOf(needle) >= 0) diveResults.push( [ "value", currentPath ] );
        }

      }
    }

    return diveResults;
  }


  /**
  * flattern a whole multidimensional array using reccursive concat
  * @param {array} array
  * @return {array}
   */
  const flatten = function(array) {
    if (Array.isArray(array)) {
      return array.reduce((done, curr) => {
        return done.concat(flatten(curr));
      }, []);
    } else {
      return array;
    }
  }
  

  /**
  * Get a flat array, and turn it into a single-level multi-dimensional array of <dimensions> values
  * If dimension doesn't match values in the array, undefined is returned for missing values
  * @param {array} array
  * @param {dimensions} integer
  * @return {array}
   */
  const pairify = function(array, dimensions) {
    let result = [];
    for (let i = 0; i < array.length; i += dimensions) {
      let resultInner = [];
      for (let i2 = 0; i2 < dimensions; i2++) {
        resultInner.push( array[i + i2] );
      }
      result.push( resultInner );
    }
    return result;
  }

  results = deepDive(json, needle);
  results = pairify(flatten(results), 2);

  return  results;
};