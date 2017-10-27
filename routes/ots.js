import log from "../libs/log";
import bodyParser from "body-parser";
import commandExists from "command-exists";

const textBodyParser = bodyParser.text({limit: '5mb'});

module.exports = app => {

	app.get("/api/ots", (req, res) => {
		return res.status(200).json({status: "OK"});
	});

	app.post("/api/ots", textBodyParser, (req, res) => {

		if (!req.body) return res.sendStatus(400);


		log.debug(req.body);

		commandExists('ots')
			.then(() => {


			}).catch(() => {
			res.sendStatus(500);
			return log.error("500 Error: Command ots doesn't exist");
		});
	});
};