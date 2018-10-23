import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

//const { JSDOM } = require('jsdom');
//
//const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
//const { window } = jsdom;
//
//function copyProps(src, target) {
//  const props = Object.getOwnPropertyNames(src)
//    .filter(prop => typeof target[prop] === 'undefined')
//    .reduce((result, prop) => ({
//      ...result,
//      [prop]: Object.getOwnPropertyDescriptor(src, prop),
//    }), {});
//  Object.defineProperties(target, props);
//}
//
//global.window = window;
//global.document = window.document;
//global.navigator = {
//  userAgent: 'node.js',
//};
//copyProps(window, global);





//const createElement = global.document.createElement;
//const FAKECanvasElement = {
//  getContext: jest.fn(() => {
//    return {
//      fillStyle: null,
//      fillRect: jest.fn(),
//      drawImage: jest.fn(),
//      getImageData: jest.fn(),
//    };
//  }),
//};

/**
 * Using Sinon to stub the createElement function call with the original method
 * unless we match the 'canvas' argument.  If that's the case, return the Fake 
 * Canvas object.
 */
//sinon.stub(global.document, 'createElement')
//  .callsFake(createElement)
//  .withArgs('canvas')
//  .returns(FAKECanvasElement);




configure({ adapter: new Adapter() });


