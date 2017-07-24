/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('color=terrain-model component', function () {
  var component;
  var el;

  setup(function (done) {
    // Standard timeout is sometimes not enough
    this.timeout(5000);
    el = entityFactory();
    el.addEventListener('object3dset', function (evt) {
      if (evt.detail.type !== 'terrain') { return; }
      component = el.components['color-terrain-model'];
      done();
    });
    el.setAttribute('color-terrain-model', {});
  });

  suite('removal', function () {
    test('disposes terrain geometry', function () {
      var geometry = el.getObject3D('terrain').geometry;
      var disposeSpy = this.sinon.spy(geometry, 'dispose');
      el.removeAttribute('color-terrain-model');
      assert.ok(disposeSpy.called);
    })

    test('disposes terrain material', function () {
      var material = el.getObject3D('terrain').material;
      var disposeSpy = this.sinon.spy(material, 'dispose');
      el.removeAttribute('color-terrain-model');
      assert.ok(disposeSpy.called);
    })

    test('removes object3D', function () {
      el.removeAttribute('color-terrain-model');
      var terrain = el.getObject3D('terrain');
      assert.equal(terrain, undefined);
    })
  })
});
