module.exports = function (req, res, next) {

	if (req.path === '/auth') {
		console.log("unsecure");
		next();
	} else if (req.headers.token === "token" || req.path === '/auth') {
		console.log("access");
		next();
	} else {
		console.log("error");
    res.status(200).json({"authentication":false});
  }
};