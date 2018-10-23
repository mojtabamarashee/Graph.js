import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon-sandbox';
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

it('updates when changing state or props', () => {
  const wrapper = shallow(<Graph />);

  const shouldComponentUpdate = sinon.spy(Graph.prototype, 'shouldComponentUpdate');

  expect(shouldComponentUpdate).to.have.property('callCount', 0);

  wrapper.setProps({ propThatWillUpdateTheComp: 'foo' });

  // or in case you are testing component update in case of state change
  // wrapper.setState({ stateThatWillUpdateTheComp: 'bar' });

  expect(shouldComponentUpdate).to.have.property('callCount', 1);

  expect(shouldComponentUpdate.returned(true)).to.be.equal(true);

});
