module.exports = app => {
	/**
	 * @api {get} / API status
	 * @apiGroup Status
	 * @apiSuccess {String} status API status' message
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 OK
	 * {"status": "text-summarization-api"}
	 * @apiError UrlNotFound
	 * @apiErrorExample Error-Response:
	 * HTTP/1.1 404 Not Found
	 */
	app.get("/", (req, res) => {
		return res.status(200).json({status: "text-summarization-api"});
	});
};