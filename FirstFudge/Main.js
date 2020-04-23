"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ƒ.Debug.log(canvas);
        let node = new ƒ.Node("Cube");
        let mesh = new ƒ.MeshCube();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.translateY(2);
        cmpCamera.pivot.translateX(2);
        cmpCamera.pivot.rotateY(200);
        cmpCamera.pivot.rotateX(20);
        FirstFudge.viewport = new ƒ.Viewport();
        FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(FirstFudge.viewport);
        FirstFudge.viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Main.js.map