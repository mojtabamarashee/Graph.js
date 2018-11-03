import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './Graph.css';


// if (process.env.NODE_ENV !== 'production') {
//  const {whyDidYouUpdate} = require('why-did-you-update');
//  whyDidYouUpdate(React);
// }

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
	   // return !equals(nextProps, this.props);
	   return false;
  }

  componentDidMount() {
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
  }

  render() {
    const style1 = { padding: '14px 0px 0px 0px', float: 'left', margin: '0px 80px 0px 0px' };
    const style2 = { cursor: 'pointer', display: 'block' };
    const style3 = { cursor: 'pointer', display: 'none' };
    const style4 = { stroke: 'rgb(255,255,255)', strokeWidth: 100 };
    const style5 = { color: 'white' };
    const style6 = { textAlign: 'center' };
    const style7 = {
      textAlign: 'center', margin: '5px 0px 0px 0px', fontSize: '15px', display: 'none',
    };
    const style8 = { textAlign: 'center', margin: '5px 0px 0px 0px', fontSize: '15px' };
    const style9 = {
      textAlign: 'center', margin: '5px 0px 0px 0px', fontSize: '15px', display: 'block',
    };
    const style10 = { width: '46px', height: '46px' };

    return (
      <div id="plot-shapes" style={style1}>
        <a id="zoom-out" name="zoom-out" style={style2} onClick={this.props.ZoomOut}>
          <svg id="ssss" className="test" viewBox="0 0 1000 1000" width="46px" height="46px">
            <path transform="matrix(1 0 0 -1 0 850)" d="m1000 350l-187 188 0-125-250 0 0 250 125 0-188 187-187-187 125 0 0-250-250 0 0 125-188-188 186-187 0 125 252 0 0-250-125 0 187-188 188 188-125 0 0 250 250 0 0-126 187 188z" />
          </svg>
        </a>
        {
          this.props.pauseFlag == 1 ? (
            <a id="play" style={style2}>
              <svg className="test" viewBox="0 0 1300 1300" width="3em" height="3em" onClick={this.props.TogglePause}>
                <path d="M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z" />
              </svg>
            </a>) : (
              <a id="pause" style={style2}>
              <svg viewBox="0 0 1000 1000" className="test" width="46px" height="46px" onClick={this.props.TogglePause}>
                  <path d="M0 499.968q0 -207.018 146.475 -353.493t353.493 -146.475 353.493 146.475 146.475 353.493 -146.475 353.493 -353.493 146.475 -353.493 -146.475 -146.475 -353.493zm275.373 259.749l152.334 0l0 -519.498l-152.334 0l0 519.498zm296.856 0l152.334 0l0 -519.498l-152.334 0l0 519.498z" />
                </svg>
            </a>)
        }

        <a id="dot" style={style2}>
          <svg className="test" viewBox="0 0 1000 1000" width="46px" height="46px" onClick={this.props.ToggleDotMode}>
            <circle
              className="test"
              cx="500"
              cy="500"
              r="500"
              stroke="black"
              strokeWidth="3"
              fill="black"
              onMouseOver="evt.target.setAttribute('fill', '#38f');"
              onMouseOut="evt.target.setAttribute('fill', 'black');"
            />
            <circle cx="500" cy="500" r="200" stroke="black" strokeWidth="3" fill="white" />
          </svg>
        </a>

        <a id="line" style={style3}>
          <svg viewBox="0 0 1000 1000" width="46px" height="46px">
            <circle
              className="outer"
              cx="500"
              cy="500"
              r="500"
              stroke="black"
              strokeWidth="3"
              fill="black"
              onMouseOver="evt.target.setAttribute('fill', '#38f');"
              onMouseOut="evt.target.setAttribute('fill', 'black');"
            />
            <line x1="0" y1="500" x2="1000" y2="500" style={style4} />
          </svg>
        </a>


        <div
          className="circle"
          ref="maxH"
          style={style8}
          onClick={() => {
            this.props.ToggleMaxHFlag(); if (this.refs.maxH.style.backgroundColor == 'rgb(0, 0, 255)') this.refs.maxH.style.backgroundColor = 'rgb(0, 0, 0)';
            else this.refs.maxH.style.backgroundColor = 'rgb(0, 0, 255)';
          }}
        >

          <span style={style5}>MaxH</span>
        </div>

        <div
          className="circle"
          ref="avg"
          style={style8}
          onClick={() => {
            this.props.ToggleAvgFlag(); if (this.refs.avg.style.backgroundColor == 'rgb(0, 0, 255)') this.refs.avg.style.backgroundColor = 'rgb(0, 0, 0)';
            else this.refs.avg.style.backgroundColor = 'rgb(0, 0, 255)';
          }}
          onDoubleClick={() => { this.props.AVGNumSet(); }}
        >

          <span style={style5}>Avg </span>
        </div>

        <div className="circle" id="x_y" title="set marker" style={style8}>
          <span style={style5}>m</span>

        </div>

        <div className="circle" id="P-Detection" style={style7}>
          <span style={style5}>Pd</span>
        </div>

      </div>
    );
  }
}
