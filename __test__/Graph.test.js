import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import { mount } from 'enzyme';
import React from 'react';
import Graph from '../src/Graph.js';
import ReactDOM from 'react-dom';





//const dom = new JSDOM('<!doctype html><html><body></body></html>')
//global.window = dom.window
//global.document = dom.window.document

it('updates when changing state or props', () => {
  const wrapper = mount(<Graph hidden={0} title="Test" sTitle ={["test1"]} index={[50]} width={600} height={400} data={{"y":[[1,2,3]]}} />);

  const shouldComponentUpdate = sinon.spy(Graph.prototype, 'shouldComponentUpdate');

  expect(shouldComponentUpdate).to.have.property('callCount', 0);

  wrapper.setProps({ data: {y:[[1,2,3,]]} });
  wrapper.setProps({ data: {y:[[1,2,3,]]} });

  // or in case you are testing component update in case of state change
  // wrapper.setState({ stateThatWillUpdateTheComp: 'bar' });

  expect(shouldComponentUpdate).to.have.property('callCount', 2);

  //expect(shouldComponentUpdate.returned(true)).to.be.equal(true);

});
