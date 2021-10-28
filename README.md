# argv-config
transfer argv to a config object

# Install
```
npm install argv-config
```

# Usage
```javascript

var argv_config= require("argv-config");
//argv_config= function ([target [, argv [, workPath]]])

var cfg = argv_config();		//default usage

cfg = argv_config({}, "--a 001 --b --c cc ".split(" "));		// `--key` `value` pair set string value
assert(JSON.stringify(cfg) === '{"a":"001","b":null,"c":"cc"}');		// single `--key` set null

cfg = argv_config({}, "--a 001 --b bb --config {b:22}".split(" "));	//--config {json-data}
assert(JSON.stringify(cfg) === '{"a":"001","b":22}');		//value will be replaced by the later

cfg = argv_config({}, "--a 001 --b bb --config {b:22} -c {b:33} -d 44".split(" "), null,
	{ "-c": "config", "-d": "dd" });	//replace short key with normal key (prefixed with '--')
assert(JSON.stringify(cfg) === '{"a":"001","b":33,"dd":"44"}');

cfg = argv_config({}, "--a 001 --b bb --config ./test-config.json".split(" "), __dirname);	//--config from json file
assert(JSON.stringify(cfg) === '{"a":"001","b":22}');

cfg = argv_config({}, "--a 001 --b bb --config ./test-config.js".split(" "), __dirname);	//--config from js module
assert(JSON.stringify(cfg) === '{"a":"001","b":22}');
```
