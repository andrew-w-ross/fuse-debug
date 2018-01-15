import * as React from 'react';

interface State {
	input: string;
	recieved?: string;
	isLoading: boolean;
}

const DEFAULT_STATE: State = {
	input: 'Hello World!!!',
	isLoading: false
};

export class ServerCaps extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = { ...DEFAULT_STATE };
	}

	async sendToServer() {
		const { input } = this.state;
		this.setState({ isLoading: true });
		const resp = await fetch(`/caps/${input}`);		
		const recieved = await resp.text();
		this.setState({ isLoading: false, recieved });		
	}

	render() {
		return (
			<div>
				<h2>Server Message</h2>
				<br />
				<input
					ref="input"
					type="text"
					disabled={this.state.isLoading}
					value={this.state.input}
					onChange={(e) => this.setState({ input: e.target.value })}
				/>
				<br />
				<button disabled={this.state.isLoading} onClick={() => this.sendToServer()}>
					Send to Server
				</button>
				<h4>Server Response: {this.state.recieved || 'No Response'}</h4>
			</div>
		);
	}
}
