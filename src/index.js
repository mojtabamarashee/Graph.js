import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Graph from './Graph.js';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { y: [[1, 2, 3]] },
      width: 600,
      height: 400,
      title: 'Test',
      sTitle: 'test1',
      updateInterval: 400,
    };
  }


  render() {
    const arr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
    const arr1 = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
    clearInterval(this.interval);
    this.interval = setInterval(() => { this.setState({ data: { y: [arr, arr1] } }); }, this.state.updateInterval);

    return (

      <div>
        <Button variant="contained" color="primary">















		  Hello World

          {' '}
        </Button>
        <br />
        <TextField
          id="interval"
          label="Update Interval"
          defaultValue="400"
          margin="normal"
          variant="outlined"
          style={{ width: 150 }}
          onChange={(e) => { this.setState({ updateInterval: parseInt(e.target.value) }); console.log(e.target.value); }}
          InputProps={{
            startAdornment: <InputAdornment position="start">ms</InputAdornment>,
          }}
        />


        <TextField
          id="title"
          label="title"
          defaultValue="Test"
          margin="normal"
          variant="outlined"
          style={{ width: 150 }}
          onChange={(e) => { this.setState({ title: e.target.value }); }}
        />

        <TextField
          id="sTitle"
          label="sTitle"
          defaultValue="test1"
          margin="normal"
          variant="outlined"
          style={{ width: 150 }}
          onChange={(e) => { this.setState({ sTitle: e.target.value }); }}
        />
        <TextField
          id="width"
          label="width"
          defaultValue="600"
          margin="normal"
          variant="outlined"
          style={{ width: 150 }}
        />

        <TextField
          id="width"
          label="Height"
          defaultValue="400"
          margin="normal"
          variant="outlined"
          onChange={() => { alert('h'); }}
          style={{ width: 150 }}
        />

        <Graph hidden={0} title={this.state.title} sTitle={[this.state.sTitle]} index={[50]} width={600} height={400} data={this.state.data} />
      </div>);
  }
}


ReactDOM.render(<Test />, document.getElementById('index'));
