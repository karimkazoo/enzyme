Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchedUpdates = exports.unmountComponentAtNode = exports.renderWithOptions = exports.childrenToArray = exports.findAllInRenderedTree = exports.findDOMNode = exports.Simulate = exports.isCompositeComponentElement = exports.isCompositeComponentWithType = exports.isCompositeComponent = exports.isDOMComponentElement = exports.isDOMComponent = exports.isElementOfType = exports.isElement = exports.mockComponent = exports.renderIntoDocument = exports.renderToStaticMarkup = exports.createShallowRenderer = undefined;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* eslint
  global-require: 0,
  import/no-mutable-exports: 0,
  import/no-unresolved: 0,
  react/no-deprecated: 0,
  react/no-render-return-value: 0,
*/

var TestUtils = void 0;
var createShallowRenderer = void 0;
var renderToStaticMarkup = void 0;
var renderIntoDocument = void 0;
var findDOMNode = void 0;
var childrenToArray = void 0;
var renderWithOptions = void 0;
var unmountComponentAtNode = void 0;
var batchedUpdates = void 0;

var React = require('react');
var ReactDOM = void 0;

if (_version.VERSION === '16.0.0-alpha.3'){
  global.window = global;
  window.addEventListener = () => {};
  window.requestAnimationFrame = () => {};
  ReactDOM = require('react-dom');
  TestUtils = require('react-addons-test-utils');
}
  (function () {

    // eslint-disable-next-line import/no-extraneous-dependencies
    exports.renderToStaticMarkup = renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

    exports.findDOMNode = findDOMNode = ReactDOM.findDOMNode;
    exports.unmountComponentAtNode = unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
    exports.batchedUpdates = batchedUpdates = ReactDOM.unstable_batchedUpdates;
    exports.createShallowRenderer = createShallowRenderer = function () {
      function createRendererCompatible() {
        var renderer = TestUtils.createRenderer();
        var originalRender = renderer.render;
        var originalRenderOutput = renderer.getRenderOutput;
        var isDOM = false;
        var cachedNode = void 0;
        return (0, _object2['default'])(renderer, {
          render: function () {
            function render(node, context) {
              /* eslint consistent-return: 0 */
              if (typeof node.type === 'string') {
                isDOM = true;
                cachedNode = node;
              } else {
                isDOM = false;
                return originalRender.call(this, node, context);
              }
            }

            return render;
          }(),
          getRenderOutput: function () {
            function getRenderOutput() {
              if (isDOM) {
                return cachedNode;
              }
              return originalRenderOutput.call(this);
            }

            return getRenderOutput;
          }()
        });
      }

      return createRendererCompatible;
    }();
    exports.renderIntoDocument = renderIntoDocument = TestUtils.renderIntoDocument;
    exports.childrenToArray = childrenToArray = React.Children.toArray;

    exports.renderWithOptions = renderWithOptions = function () {
      function renderWithOptions(node, options) {
        if (options.attachTo) {
          return ReactDOM.render(node, options.attachTo);
        }
        return TestUtils.renderIntoDocument(node);
      }

      return renderWithOptions;
    }();
  })();

function isDOMComponentElement(inst) {
  return React.isValidElement(inst) && typeof inst.type === 'string';
}

var _TestUtils = TestUtils,
    mockComponent = _TestUtils.mockComponent,
    isElement = _TestUtils.isElement,
    isElementOfType = _TestUtils.isElementOfType,
    isDOMComponent = _TestUtils.isDOMComponent,
    isCompositeComponent = _TestUtils.isCompositeComponent,
    isCompositeComponentWithType = _TestUtils.isCompositeComponentWithType,
    isCompositeComponentElement = _TestUtils.isCompositeComponentElement,
    Simulate = _TestUtils.Simulate,
    findAllInRenderedTree = _TestUtils.findAllInRenderedTree;
exports.createShallowRenderer = createShallowRenderer;
exports.renderToStaticMarkup = renderToStaticMarkup;
exports.renderIntoDocument = renderIntoDocument;
exports.mockComponent = mockComponent;
exports.isElement = isElement;
exports.isElementOfType = isElementOfType;
exports.isDOMComponent = isDOMComponent;
exports.isDOMComponentElement = isDOMComponentElement;
exports.isCompositeComponent = isCompositeComponent;
exports.isCompositeComponentWithType = isCompositeComponentWithType;
exports.isCompositeComponentElement = isCompositeComponentElement;
exports.Simulate = Simulate;
exports.findDOMNode = findDOMNode;
exports.findAllInRenderedTree = findAllInRenderedTree;
exports.childrenToArray = childrenToArray;
exports.renderWithOptions = renderWithOptions;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.batchedUpdates = batchedUpdates;
