"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    class SnakeSegment extends ƒ.Node {
        constructor(_name) {
            ƒ.Debug.log("Creating new SnakeSegment...");
            super(_name);
            this.createComponents();
            this.radius = 0.5;
            this.position = this.mtxLocal;
        }
        collidesWith(_target) {
            let distance = ƒ.Vector3.DIFFERENCE(this.position.translation, _target.position.translation).magnitude;
            let result = false;
            if (distance < this.radius + _target.radius)
                result = true;
            return result;
        }
        createComponents() {
            let mesh = new ƒ.MeshCube();
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
            this.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
        }
    }
    Snake3D.SnakeSegment = SnakeSegment;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=SnakeSegment.js.map