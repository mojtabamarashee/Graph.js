
[![Build status](https://ci.appveyor.com/api/projects/status/pjxh5g91jpbh7t84?svg=true)](https://ci.appveyor.com/project/tygerbytes/resourcefitness) |
![Alt text](screenshots/screenshot1.png?raw=true "Optional Title")

<br>

# <a href="http://mojtabamarashee.github.io/graph.js">Demo</a>


# Run

```bash
git clone http://github.com/mojtabamarashee/graph.js
cd graph.js

npm install
npm start

```

# Usage
```javascript
import React from "react";
import {Component} from "react";
import Graph from "./Graph.js";
import ReactDOM from "react-dom";

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data : {y:[[1,2,3]]}
		}
	}
	
	render(){

		var arr = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
		setInterval(()=>{this.setState({data : {"y": [arr]}})} , 400);
		return(
			<div><Graph hidden={0} title="Test" sTitle ={["test1"]} index={[50]} width={600} height={400} data={this.state.data}/></div>
		)
	}
}


ReactDOM.render(<Test />, document.getElementById("index"));

````

