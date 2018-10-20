import React, { Component } from 'react';
import ReactDOM from "react-dom";
class App extends Component {
	constructor(props) {
		super(props);
	}
	const Index = () => {
		return <div>Hello React!</div>;
	};

    render() {
        return (<Index/>)
    }
}

export default App;
