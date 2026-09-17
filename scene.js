/* Babylon.js is loaded locally by app.js. No GUI extension or remote assets needed. */
(function () {
  'use strict';
  function createDuffScene(engine, canvas) {
    var B = window.BABYLON;
    var scene = new B.Scene(engine);
    scene.clearColor = new B.Color4(0.929, 0.780, 0.286, 1);
    var camera = new B.ArcRotateCamera('camera', -Math.PI / 2, 1.17, 7.9, new B.Vector3(0, 1.85, 0), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 11;
    camera.lowerBetaLimit = 0.25;
    camera.upperBetaLimit = 1.53;
    camera.panningSensibility = 0;
    camera.wheelPrecision = 50;
    camera.keysUp = [38]; camera.keysDown = [40];
    camera.keysLeft = [37]; camera.keysRight = [39];
    var fill = new B.HemisphericLight('fill', new B.Vector3(0, 1, 0), scene);
    fill.intensity = 0.9;
    fill.groundColor = new B.Color3(0.4, 0.32, 0.2);
    var key = new B.DirectionalLight('key', new B.Vector3(-1, -2, 1), scene);
    key.position = new B.Vector3(4, 7, -5); key.intensity = 1.4;
    var rim = new B.PointLight('rim', new B.Vector3(-3, 4, 2), scene);
    rim.intensity = 0.45;
    var shadows = new B.ShadowGenerator(1024, key);
    shadows.useBlurExponentialShadowMap = true;
    shadows.blurKernel = 24;
    var can = new B.TransformNode('Duff can', scene);
    can.position.y = 1.93;
    function material(name, color, shine) {
      var m = new B.StandardMaterial(name, scene);
      m.diffuseColor = B.Color3.FromHexString(color);
      m.specularColor = new B.Color3(shine, shine, shine);
      m.specularPower = 96;
      return m;
    }
    var silver = material('Brushed aluminum', '#c9d1d3', 0.95);
    var recess = material('Recessed metal', '#8a979c', 0.65);
    var black = material('Dark opening', '#151b1e', 0.15);
    function part(mesh, mat, y) {
      mesh.parent = can; mesh.material = mat; mesh.position.y = y;
      shadows.addShadowCaster(mesh); return mesh;
    }
    var labelTexture = new B.DynamicTexture('Duff label', {width:2048,height:1024}, scene, false);
    var ctx = labelTexture.getContext();
    ctx.fillStyle = '#d52c22'; ctx.fillRect(0,0,2048,1024);
    ctx.fillStyle = '#fff0d3'; ctx.fillRect(0,195,2048,620);
    ctx.fillStyle = '#151b1e'; ctx.fillRect(0,190,2048,14); ctx.fillRect(0,808,2048,14);
    [512,1536].forEach(function (x) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#151b1e'; ctx.font = 'italic bold 265px Georgia, serif';
      ctx.fillText('Duff', x, 460, 860);
      ctx.font = 'bold 96px Arial, sans-serif'; ctx.fillText('BEER', x, 670);
      ctx.fillStyle = '#fff0d3'; ctx.font = 'bold 38px Arial, sans-serif';
      ctx.fillText('THE SQUAD’S ADVENTURE EDITION', x, 916, 900);
    });
    labelTexture.update(); labelTexture.anisotropicFilteringLevel = 8;
    var label = material('Printed label', '#ffffff', 0.35);
    label.diffuseTexture = labelTexture;
    part(B.MeshBuilder.CreateCylinder('Can body', {
      height:2.95,diameter:1.84,tessellation:96,
      faceUV:[new B.Vector4(0,0,0,0),new B.Vector4(0,0,1,1),new B.Vector4(0,0,0,0)]
    },scene),label,0);
    part(B.MeshBuilder.CreateCylinder('Upper shoulder',{height:0.22,diameterBottom:1.84,diameterTop:1.7,tessellation:96},scene),silver,1.565);
    part(B.MeshBuilder.CreateCylinder('Lower shoulder',{height:0.18,diameterTop:1.84,diameterBottom:1.7,tessellation:96},scene),silver,-1.555);
    part(B.MeshBuilder.CreateCylinder('Base',{height:0.05,diameter:1.68,tessellation:96},scene),silver,-1.65);
    part(B.MeshBuilder.CreateCylinder('Lid',{height:0.055,diameter:1.66,tessellation:96},scene),silver,1.69);
    part(B.MeshBuilder.CreateCylinder('Lid inset',{height:0.025,diameter:1.43,tessellation:96},scene),recess,1.723);
    [-1.665,1.735].forEach(function(y){
      part(B.MeshBuilder.CreateTorus('Rolled rim',{diameter:1.72,thickness:0.09,tessellation:96},scene),silver,y);
    });
    var opening = part(B.MeshBuilder.CreateSphere('Drink opening',{diameter:1,segments:32},scene),black,1.748);
    opening.scaling.set(0.48,0.014,0.66); opening.position.z = 0.32;
    var tab = part(B.MeshBuilder.CreateTorus('Pull tab',{diameter:0.43,thickness:0.115,tessellation:48},scene),silver,1.78);
    tab.scaling.z = 1.65; tab.position.z = -0.18;
    part(B.MeshBuilder.CreateCylinder('Tab rivet',{diameter:0.13,height:0.06,tessellation:32},scene),silver,1.785);
    var plinth = B.MeshBuilder.CreateCylinder('Display stand',{height:0.23,diameter:3.3,tessellation:96},scene);
    plinth.position.y = 0.12; plinth.material = material('Stand material','#f8e5af',0.15); plinth.receiveShadows = true;
    var ground = B.MeshBuilder.CreateGround('Backdrop',{width:200,height:200},scene);
    ground.material = material('Gold backdrop','#edc749',0); ground.receiveShadows = true;
    return {scene:scene,camera:camera,can:can};
  }
  window.createDuffScene = createDuffScene;
  window.startDuffViewer = function () {
    var canvas = document.getElementById('renderCanvas');
    var status = document.getElementById('sceneStatus');
    var spinButton = document.getElementById('toggleSpin');
    var resetButton = document.getElementById('resetView');
    var engine;
    function fail(error) {
      if (engine) engine.stopRenderLoop();
      status.hidden = false;
      status.textContent = 'The 3D can could not start: ' + (error.message || String(error));
      if (spinButton) spinButton.disabled = true;
      if (resetButton) resetButton.disabled = true;
      console.error(error);
    }
    try {
      if (!window.BABYLON) throw new Error('vendor/babylon.js did not load.');
      if (!window.BABYLON.Engine.IsSupported()) throw new Error('WebGL is unavailable. Try a browser with graphics acceleration enabled.');
      engine = new window.BABYLON.Engine(canvas,true,{stencil:true});
      var view = createDuffScene(engine,canvas);
      var scene = view.scene;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      var spinning = !reduced.matches;
      var pointers = new Set();
      var firstFrame = true;
      function updateButton() {
        if (spinButton) spinButton.textContent = spinning ? 'Pause rotation' : 'Resume rotation';
      }
      updateButton();
      if (spinButton) spinButton.addEventListener('click',function(){spinning=!spinning;updateButton();});
      if (resetButton) resetButton.addEventListener('click',function(){
        view.camera.alpha=-Math.PI/2;view.camera.beta=1.17;view.camera.radius=7.9;view.can.rotation.y=0;
      });
      canvas.addEventListener('pointerdown',function(event){pointers.add(event.pointerId);});
      function endPointer(event){pointers.delete(event.pointerId);}
      window.addEventListener('pointerup',endPointer);
      window.addEventListener('pointercancel',endPointer);
      function motionChange(event){if(event.matches){spinning=false;updateButton();}}
      if (reduced.addEventListener) reduced.addEventListener('change',motionChange);
      scene.onBeforeRenderObservable.add(function(){
        var ageDialog=document.getElementById('ageDialog');
        if(spinning && pointers.size===0 && !(ageDialog && ageDialog.open)) {
          view.can.rotation.y += Math.min(engine.getDeltaTime(),50)*0.00022;
        }
      });
      engine.runRenderLoop(function(){
        try {
          scene.render();
          if(firstFrame && scene.isReady()){
            firstFrame=false;status.hidden=true;
            if(spinButton)spinButton.disabled=false;
            if(resetButton)resetButton.disabled=false;
            console.log('Duff Beer Squad: the can is ready. Welcome to the adventure!');
          }
        } catch(error){fail(error);}
      });
      window.setTimeout(function(){
        if(firstFrame && !engine.isDisposed){
          status.textContent='Still preparing the 3D scene. If it stays here, check your browser console for an error or try another browser.';
        }
      },15000);
      function resize(){engine.resize();}
      window.addEventListener('resize',resize);
      // Restore the correct canvas dimensions after back/forward navigation.
      window.addEventListener('pageshow',resize);
    }catch(error){fail(error);if(engine)engine.dispose();}
  };
})();
