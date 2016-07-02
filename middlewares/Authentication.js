module.exports = function (req, res, next) {

	if (req.headers.token) {
		console.log("access");
		next();
	} else {
		console.log("error");
    res.status(200).json({"authentication":false});
  }
};