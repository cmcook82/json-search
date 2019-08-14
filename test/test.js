'use strict';

const expect = require('chai').expect;
const jsonSearch = require('../index');

const testJson = { 
  "General" :  {
		"system": "TEST",
		"name": "Json Searcher",
		"someBool": true,
    "testNumbers": [ 1, 2, 4, 8 ],
    "version": 1,
    "DeepVersion": { "version": 2 }
  },
  "emailSvr": {
		"host": "somedmoain.com",
		"port": 25,
		"username": "mailserverusername",
    "passdev": "someinsecurepasswordfortest",
    "extraData": "version 1"
  },
  "Version": 1,
  "test": "version"
};

const testString = '{ "testkey": 1, "anotherkey": 2, "version": 3 }';

const testBadString = '{ "testkey": 1, "anotherkey": [ foo foo }';

describe('#jsonSearch', function() {

  it('Should return an array from Json object in with 5 results', function() {
    const result = jsonSearch(testJson, 'version');
    expect(result).to.be.a('array');
    expect(result.length).equal(5);
  });

  it('Should return an array from string sent in and get a result', function() {
    const result = jsonSearch(testString, 'version');
    expect(result).to.be.a('array');
    expect(result.length).equal(1);
  });

  it('Bad Json should be empty', function() {
    const result = jsonSearch(testBadString, 'version');
    expect(result).to.be.a('array');
  });

  it('First positive result should be a key type', function() {
    const result = jsonSearch(testJson, 'version');
    expect(result[0][0]).to.equal('key');
  });
});