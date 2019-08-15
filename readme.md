## Json Search
Parse and iterate JSON, returning the path for all results matching a search


## Installation

  `npm install @cmcook82/json-search`


## Usage

json : object/string  ... json object to search

needle : string ... string to find

ignoreCase : boolean(true) ... ignore case when searching

searchType : integer(0) ... match kays or values or both: 0 = any, 1 = keys only, 2 = values only

pathSeparator : string('.') ... separator between path elements e.g. ' > ', '.', '/'


## Returns

Provides a multi-dimensional array with the type of match (value/key) abnd the path to it within the json passed in.


## Testing

Basic Mocha/Chai tests included

`npm test`


## Updates to make

Add ability to give a filename opposed to a Json string/object

Add exact/partial match types and return type of match to array


## pairify function

Contains pairify, a function that takes a flat array, and combines elements of groups of a set dimension (paramemer) for a single-level multi-dimensional array.  Helps in being able to generate an array via iteration and then clean it up for use.


## flatten function

Nothing fancy, just a standard array concat to flatten it, but calls itself in inctances of deeper arrays.
