import React, { Component } from "react";
import axios from "axios";
import Actions from "./components/Actions";

const api = axios.create({
	baseURL: `http://localhost:4000/projects`,
});

// take of ids!!!

export default class App extends Component {
	state = {
		projects: [{ name: "", description: "" }],
	};
	constructor() {
		super();
		this.getProjects();
	}

	createProject = async (id, val) => {
		let res = await api
			.post(`/${id}`, {
				name: "Jack Smith",
				description: "Something about Jack Smith",
			})
			.then((res) => this.setState(res));
		console.log(res);
		this.getProjects();
	};

	updateProject = async (id, val) => {
		let data = await api.put(`/${id}`, val).then((res) => {
			this.setState();
		});
		this.getProjects();
	};

	getProjects = async () => {
		let data = await api.get("/").then(({ data }) => data);
		console.log(data);
		this.setState({ projects: data });
	};

	deleteProject = async (id) => {
		let data = await api.delete(`/${id}`);
		this.getProjects();
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const project = {
			name: this.state.name,
			decsription: this.state.description,
		};
	};

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	render() {
		return (
			<div className='content'>
				{this.state.projects.map((project) => (
					<div key={project.id} className='item'>
						<h2 className='sub-item'>{project.name}</h2>
						<h3 className='sub-item'>{project.description}</h3>
						<button onClick={() => this.deleteProject(project.id)}>X</button>
						<button onClick={() => this.updateProject(project.id)}>
							Update
						</button>
					</div>
				))}
				<form onSubmit={this.handleSubmit} className='item'>
					<label className='form'>
						Name:
						<input type='text' name='name' onChange={this.handleChange} />
					</label>
					<label className='form'>
						Description:
						<input
							type='text'
							name='description'
							onChange={this.handleChange}
						/>
					</label>
					{/* <label>
						Completed:
						<input type='' name='completed' onChange={this.handleChange} />
					</label> */}
					<button onClick={this.createProject}>Add Project</button>
				</form>
				<div className="actions">
					<Actions />
				</div>
			</div>
		);
	}
}
