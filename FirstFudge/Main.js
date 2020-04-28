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
        let node = new ƒ.Node("Cube1");
        let node2 = new ƒ.Node("Cube2");
        let node3 = new ƒ.Node("cube3");
        node.addChild(node2);
        node.addChild(node3);
        let mesh = new ƒ.MeshCube();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let cmpMesh2 = new ƒ.ComponentMesh(mesh);
        let cmpMesh3 = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        node2.addComponent(cmpMesh2);
        node3.addComponent(cmpMesh3);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let mtrSolidRed = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
        let cmpMaterial2 = new ƒ.ComponentMaterial(mtrSolidRed);
        let cmpMaterial3 = new ƒ.ComponentMaterial(mtrSolidRed);
        node2.addComponent(cmpMaterial2);
        node3.addComponent(cmpMaterial3);
        let transform = new ƒ.Matrix4x4();
        transform.translateZ(-2);
        transform.translateX(2);
        let cmpTransform = new ƒ.ComponentTransform(transform);
        node2.addComponent(cmpTransform);
        let transform2 = new ƒ.Matrix4x4();
        transform2.translateZ(-2);
        transform2.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
        let cmpTransform2 = new ƒ.ComponentTransform(transform2);
        node3.addComponent(cmpTransform2);
        ƒ.Debug.log(node);
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