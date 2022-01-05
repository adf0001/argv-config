// global, for html page
assert = require("assert");
argv_config = require("../argv-config.js");

module.exports = {

	"argv_config()": function (done) {

		var cfg = argv_config();		//default usage

		cfg = argv_config({}, "--a 001 --b --c cc ".split(" "));		// `--key` `value` pair set string value
		assert(JSON.stringify(cfg) === '{"a":"001","b":null,"c":"cc"}');		// single `--key` set null

		cfg = argv_config({}, "--a 001 --b bb --config {b:22}".split(" "));	//--config {json-data}
		assert(JSON.stringify(cfg) === '{"a":"001","b":22}');		//value will be replaced by the later

		cfg = argv_config({}, "--a 001 --b bb --config {b:22} -c {b:33} -d 44".split(" "), null,
			{ "-c": "config", "-d": "dd" });	//replace short key with normal key (prefixed with '--')
		assert(JSON.stringify(cfg) === '{"a":"001","b":33,"dd":"44"}');

		done(false);
	},

	"---config file": function (done) {
		if (typeof window !== "undefined") throw "disable for browser";

		var cfg = argv_config({}, "--a 001 --b bb --config ./test-config.json".split(" "), __dirname);	//--config from json file
		assert(JSON.stringify(cfg) === '{"a":"001","b":22}');

		cfg = argv_config({}, "--a 001 --b bb --config ./test-config.js".split(" "), __dirname);	//--config from js module
		assert(JSON.stringify(cfg) === '{"a":"001","b":22}');

		done(false);
	},

	"file path": function (done) {

		cfg = argv_config({}, "--a ./aa --b .. --c .cc".split(" "), "pp");		//prefix workPath before "." or "..", when workPath is not empty
		assert(JSON.stringify(cfg) === '{"a":"pp/./aa","b":"pp/..","c":".cc"}');

		done(false);
	},
};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
