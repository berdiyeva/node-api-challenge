const express = require("express");
const projects = require("./helpers/projectModel");

const router = express.Router();

//---GET---
router.get("/projects", (req, res) => {
	projects
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Could not find projects",
			});
		});
});

router.get("/projects/:id", checkProjectID(), (req, res) => {
	res.status(200).json(res.project);
});

//---INSERT-/-POST---
router.post("/projects", checkProjectData(), (req, res) => {
	projects
		.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error adding the project",
			});
		});
});

//---UPDATE-/-PUT---
router.put("/projects/:id", checkProjectData(), (req, res) => {
	projects
		.update(req.params.id, req.body)
		.then((project) => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({
					message: "The project with specified ID does not exist",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res
				.status(500)
				.json({ error: "The project information could not be modified." });
		});
});

//---REMOVE-/-DELETE---
router.delete("/projects/:id", (req, res) => {
	projects
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The project has been deleted.",
				});
			} else {
				res.status(404).json({
					message: "The project with specified ID doesn't exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: "The project could not be removed.",
			});
		});
});

//---MIDDLEWAREs---
function checkProjectID() {
	return (req, res, next) => {
		projects
			.get(req.params.id)
			.then((project) => {
				if (project) {
					req.project = project;
					next();
				} else {
					res.status(400).json({
						message: "Project not found.",
					});
				}
			})
			.catch(next);
	};
}

function checkProjectData() {
	return (req, res, next) => {
		if (!req.body.name || !req.body.description) {
			return res.status(400).json({
				message: "Missing project name and description.",
			});
		}
		next();
	};
}

module.exports = router;
