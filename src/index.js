import React from "react";
import {Component} from "react";
import Graph from "./Graph.js";
import ReactDOM from "react-dom";

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data : []
		}
	}
	

	render(){

		var arr = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
		setInterval(()=>{this.setState({data : {"y": [[0,1,2,4]]}})} , 1000);

 return(

	<div>
		<Graph hidden={0} title="Test" sTitle ={["test1"]} index={[50]} width={600} height={400} data={this.state.data}/>
	</div>)}
}




ReactDOM.render(<Test />, document.getElementById("index"));
