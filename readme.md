#Json Search#
Parse and iterate JSON, returning the path for all results matching a search


## Installation

  `npm install @cmcook82/json-search`


## Usage

json : object/string		json object to search
needle : string          	string to find
ignoreCase : boolean(true)     	ignore case when searching
searchType : integer(0)     	match kays or values or both: 0 = any, 1 = keys only, 2 = values only
pathSeparator : string('.')   	separator between path elements e.g. ' > ', '.', '/'


## Returns

Provides a multi-dimensional array with the type of match (value/key) abnd the path to it within the json passed in.


## Testing

Basic Mocha/Chai tests included

`npm test`
