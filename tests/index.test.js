/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('terrain-model component', function () {
  var component;
  var el;

  setup(function (done) {
    el = entityFactory();
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'terrain-model') { return; }
      component = el.components['terrain-model'];
      done();
    });
    el.setAttribute('terrain-model', {});
  });

  suite('wireframe property', function () {
    test('is false', function () {
      assert.equal(el.getAttribute("terrain-model", "wireframe").wireframe, false);
    });
  });
});
