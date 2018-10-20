import React from "react";
import Graph from "./Graph.js";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};



const Comp = ()=>{ return(
	<div>
		<Graph hidden={0} title="Test" sTitle ={["test1", "test2"]} index={[50, 51]} width={600} height={400} data={{"x":0, "y":0}}/>
	</div>)}




ReactDOM.render(<Comp />, document.getElementById("index"));
