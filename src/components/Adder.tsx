import * as React from "react";

interface State {
	value: number;
}

const DEFAULT_STATE : State = {
	value : 0
};

export class Adder extends React.Component<Partial<State>, State>{
	constructor(props: State) {
		super();
		this.state = {...DEFAULT_STATE, ...props};
	}

	add() {
		let { value } = this.state;
		value += 1;
		this.setState({ value });
	}

	render() {
		return (
			<div>
				<h1>Current Value {this.state.value}</h1>
				<button onClick={() => this.add()}>Click Me</button>
			</div>
		);
	}
}