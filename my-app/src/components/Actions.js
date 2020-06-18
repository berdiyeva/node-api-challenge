import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
	baseURL: `http://localhost:4000/actions`,
});

export default class Actions extends Component {
	state = {
		actions: [],
	};
	constructor() {
		super();
		this.getActions();
	}

	getActions = async () => {
		let data = await api.get("/").then(({ data }) => data);
		console.log(data);
		this.setState({ actions: data });
	};

	render() {
		return (
			<div>
				{this.state.actions.map((action) => (
					<div key={action.id} className='item'>
						<h2 className='sub-item'>{action.project_id}</h2>
						<h3 className='sub-item'>{action.description}</h3>
						<h3 className='sub-item'>{action.notes}</h3>
					</div>
				))}
			</div>
		);
	}
}
