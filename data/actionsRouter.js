const express = require("express");
const actions = require("./helpers/actionModel");

const router = express.Router();

//---GET---
router.get("/actions", (req, res) => {
	actions
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Could not find actions",
			});
		});
});

router.get("/actions/:id", (req, res) => {
	actions
		.get(req.params.id)
		.then((action) => {
			if (req.params.id) {
				res.status(200).json(action);
			} else {
				res.status(404).json({
					error: "No action with that ID",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: "The actions information could not be found",
			});
		});
});

//---REMOVE-/-DELETE---
router.delete("/actions/:id", (req, res) => {
	actions
		.remove(req.params.id)
		.then((action) => {
			if (!req.params.id) {
				res.status(404).json({
					message: "The action with the specific ID does not exist",
				});
			} else {
				res
					.status(200)
					.json({ action, message: "Action was successfully deleted" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: "The action could not be removed",
			});
		});
});

//---UPDATE-/-PUT---
router.put("/actions/:id", (req, res) => {
	actions.get(req.params.id).then((action) => {
		if (!req.body.project_id || !req.body.description || req.body.completed) {
			res.status(400).json({
				message: "Please provide description and notes for updated actions",
			});
		} else {
			actions
				.update(req.params.id, req.body)
				.then((action) => {
					res.status(200).json(req.body);
				})
				.catch((error) => {
					res.status(500).json({
						error: "The action information could not be updated",
					});
				});
		}
	});
});

//---INSERT-/-POST---
// router.post("/actions/:id/actions", (req, res) => {
// 	const body = req.body;
// 	const id = req.params.id;
// 	const newAction = { ...body, projectId: id };

// 	actions
// 		.insert(newAction)
// 		.then((action) => {
// 			res.status(200).json({ action });
// 		})
// 		.catch((err) => {
// 			res.status(500).json({
// 				errorMessage: `There was an error while saving the action ${err.res}`,
// 			});
// 		});
// });

router.post("/actions/:id", (req, res) => {
	actions
		.get()
		.then((action) => {
			if (!req.body.project_id || !req.body.description || req.body.completed) {
				res.status(400).json({
					message: "Please fill all the fields",
				});
			} else {
				actions
					.insert(req.body)
					.then((action) => {
						res.status(201).json(action);
					})
					.catch((error) => {
						console.log(error);
						res.status(500).json({
							message: "Error adding the action",
						});
					});
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Could not add a new action" });
		});
});
// //---MIDDLEWAREs---
// function checkAction(req, res, next) {
// 	if (!req.body) {
// 		res.status(400).json({
// 			message: "missing data",
// 		});
// 	} else if (!req.body.description || !req.body.notes) {
// 		res.status(400).json({
// 			message: "missing fields",
// 		});
// 	} else {
// 		next();
// 	}
// }

module.exports = router;
