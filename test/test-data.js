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
};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
