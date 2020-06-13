const express = require("express");
const actions = require("./helpers/actionModel");

const router = express.Router();

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
	const id = req.params.id;

	actions
		.get(id)
		.then((specific) => {
			if (id) {
				res.status(200).json(specific);
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

router.delete("/actions/:id", (req, res) => {
	const id = req.params.id;

	actions
		.remove(id)
		.then((deletedA) => {
			if (!id) {
				res.status(404).json({
					message: "The action with the specific ID does not exist",
				});
			} else {
				res.status(200).json({ deletedA });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: "The action could not be removed",
			});
		});
});

router.put("/actions/:id", (req, res) => {
	const id = req.params.id;
	const body = req.body;

	actionsDb
		.update(id, body)
		.then((updatedA) => {
			if (!id) {
				res.status(404).json({
					message: "The action with the specific ID does not exist",
				});
			} else if (!updatedA.description || !updatedA.notes) {
				res.status(400).json({
					message: "Please provide description and notes for updated actions",
				});
			} else {
				res.status(200).json({ updatedA });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: "The action information could not be updated",
			});
		});
});

module.exports = router;
