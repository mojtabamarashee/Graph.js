import React from "react";
import Graph from "./Graph.js";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};



		const Comp = 
			<div>
				<Graph hidden= {0} title="Test" sTitle ={["test1", "test2"]} index={[50, 51]} width={600} height={400}/>
			</div>

		var hidden = 0;
		const Comp2 = 
				<div style={{display:hidden == 1 ? "none" : "block"}}>
				{
					Comp.props.children.map((child, index) => {
						return React.cloneElement(child, {
							hidden: hidden
						})					
					})
				}
				</div>
	



ReactDOM.render(<Comp />, document.getElementById("index"));
