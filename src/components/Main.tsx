import * as React from "react";
import { Adder } from "./Adder";

export class Main extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello World</h1>
				<Adder />
				<Adder value={1}/>
			</div>
		);
	}
}