"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    class Food extends ƒ.Node {
        constructor(_name) {
            ƒ.Debug.log("Creating new Food...");
            super(_name);
            this.createComponents();
            this.radius = 0.5;
            this.position = this.mtxLocal;
        }
        randomizeLocation() {
            let rnd = new ƒ.Random();
            let height = Snake3D.viewport.getClientRectangle().height;
            let width = Snake3D.viewport.getClientRectangle().width;
            let x = rnd.getRangeFloored(0, width);
            let y = rnd.getRangeFloored(0, height);
            let pos2D = Snake3D.viewport.pointClientToProjection(new ƒ.Vector2(x, y));
            pos2D.scale(50);
            pos2D.x = Math.floor(pos2D.x);
            pos2D.y = Math.floor(pos2D.y);
            let position = pos2D.toVector3();
            ƒ.Debug.log("Food at: " + position.toString());
            this.mtxLocal.translation = position;
        }
        setLocation(_position) {
            this.mtxLocal.translation = _position;
        }
        createComponents() {
            let mesh = new ƒ.MeshQuad();
            let mtrSolidRed = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidRed);
            this.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
        }
    }
    Snake3D.Food = Food;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Food.js.map