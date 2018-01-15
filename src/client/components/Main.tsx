import * as React from "react";
import { Adder } from "./Adder";
import { ServerCaps } from "./ServerCaps";


export class Main extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello World</h1>
				<Adder />
				<hr/>				
				<ServerCaps />
			</div>
		);
	}
}