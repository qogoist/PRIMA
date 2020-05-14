"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    class Food extends ƒ.Node {
        constructor(_name, _cubeSize) {
            ƒ.Debug.log("Creating new Food...");
            super(_name);
            this.createComponents();
            this.surfacePos = _cubeSize / 2 + 1;
            this.radius = 0.5;
            this.randomizeLocation();
        }
        randomizeLocation() {
            let rnd = new ƒ.Random();
            let randomCoord = rnd.getRangeFloored(0, 3);
            let x;
            let y;
            let z;
            switch (randomCoord) {
                case 0:
                    x = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    y = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    if (rnd.getBoolean())
                        z = this.surfacePos;
                    else
                        z = -this.surfacePos;
                    break;
                case 1:
                    if (rnd.getBoolean())
                        x = this.surfacePos;
                    else
                        x = -this.surfacePos;
                    y = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    z = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    break;
                case 2:
                    x = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    if (rnd.getBoolean())
                        y = this.surfacePos;
                    else
                        y = -this.surfacePos;
                    z = rnd.getRangeFloored(-(this.surfacePos - 1), this.surfacePos - 1);
                    break;
            }
            let position = new ƒ.Vector3(x, y, z);
            ƒ.Debug.log("Food at: " + position.toString());
            this.mtxLocal.translation = position;
        }
        collidesWith(_target) {
            let distance = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.getComponent(ƒ.ComponentTransform).local.translation).magnitude;
            let result = false;
            if (distance < this.radius + _target.radius)
                result = true;
            return result;
        }
        createComponents() {
            let mesh = new ƒ.MeshCube();
            let mtrSolidRed = new ƒ.Material("SolidRed", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("RED", 1)));
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