
// argv-config @ npm
// transfer argv to a config object

module.exports = function (target, argv, workPath) {
	if (!target) target = {};
	if (!argv) argv = process.argv;
	if (!workPath) workPath = process.cwd();

	var i, k, v;
	for (i = 0; i < argv.length; i++) {
		if ((k = argv[i]).slice(0, 2) !== "--") continue;
		k = k.slice(2);

		if (!(v = argv[i + 1]) || v.slice(0, 2) === "--") {
			target[k] = null;
			continue;
		}

		if (v.charAt(0) == "{" && v.slice(-1) == "}") v = eval("(" + v + ")");	//json string
		else if (v.charAt(0) === ".") v = workPath + "/" + v;		//file path

		if (k === "config") Object.assign(target, (typeof v === "string") ? require(v) : v);
		else target[k] = v;

		i++;
	}
	return target;
}
