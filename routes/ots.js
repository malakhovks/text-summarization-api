import log from "../libs/log";
import {text} from "body-parser";
import commandExists from "command-exists";
import * as OTS from "child_process";
import {writeFile, unlink} from "fs";

const textBodyParser = text({limit: '5mb'});

function writeFilePromise(filename, data, encoding) {
	return new Promise(function(resolve, reject) {
		writeFile(filename, data, encoding, (error) => {
			if (error) reject(error);
			else resolve(data);
		});
	});
}

module.exports = app => {

	app.post("/api/ots", textBodyParser, (req, res) => {

		if (!req.body) return res.status(400).send("Empty body");

		log.debug(req.body);

		const filenameForFileForOTS = "./public/uploads/" + Date.now() + ".txt";

		writeFilePromise(filenameForFileForOTS, req.body, "utf8")
			.then(() => {

				commandExists('ots')
					.then(() => {

						OTS.exec("ots -r 20 --dic uk " + filenameForFileForOTS, {maxBuffer: 3000 * 1024},
							(error, stdout, stderr) => {

								if (error) {
									unlink(filenameForFileForOTS);
									res.sendStatus(500);
									log.error(error);
									return log.error(stderr);
								}

								log.debug("Done!");
								log.debug("\n" + stdout);

								unlink(filenameForFileForOTS);
								res.type('text/plain');
								res.status(200).send(stdout.trim());
							})

					}).catch(() => {
					unlink(filenameForFileForOTS);
					res.sendStatus(500);
					return log.error("500 Error: Command ots doesn't exist");
				});

			}).catch(() => {
			res.sendStatus(500);
			return log.error("500 Error: writeFilePromise function error");
		});
	});
};