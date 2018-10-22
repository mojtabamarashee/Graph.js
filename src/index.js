import React from "react";
import Graph from "./Graph.js";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};



const Comp = ()=>{ return(
	<div>
		<Graph hidden={0} title="Test" sTitle ={["test1"]} index={[50]} width={600} height={400} data={{"y":[[0, 1, 2, 3, 4, 500]]}}/>
	</div>)}




ReactDOM.render(<Comp />, document.getElementById("index"));
