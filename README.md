

![Alt text](screenshots/screenshot1.png?raw=true "Optional Title")


# <a href="http://mojtabamarashee.github.io/graph.js">Demo</a>


# Run

```bash
git clone http://github.com/mojtabamarashee/graph.js
cd graph.js

npm install
npm start

```


# Features
1. Auto Scale X , Y axise
2. Zoom In (using mouse) and out
3. Max Hold
4. Avg Calculater 


# Usage
```javascript
import React from 'react';
import {Component} from 'react';
import Graph from './Graph.js';
import ReactDOM from 'react-dom';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {y: [[1, 2, 3]]},
    };
  }

  render() {
    var arr = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
    setInterval(() => {
      this.setState({data: {y: [arr]}});
    }, 400);
    return (
      <div>
        <Graph
          hidden={0}
          title="Test"
          sTitle={['test1']}
          index={[50]}
          width={600}
          height={400}
          data={this.state.data}
        />
      </div>
    );
  }
}

ReactDOM.render(<Test />, document.getElementById('index'));

````


# Props

| Name | Des |
| ------------- | ------------- |
| hidden  | if set to 1 the graph dont update |
| width | width of Graph  |
| height | Height of plot  |
| data | data to plot, array of {y:[]} objects  |
| title | name of Graph  |
| sTitle | name of subPlots;   |

