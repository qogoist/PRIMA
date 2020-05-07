"use strict";
var Snake;
(function (Snake_1) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor(_name, _segments) {
            ƒ.Debug.log("Creating new Snake...");
            super(_name);
            this.dirCurrent = ƒ.Vector3.X();
            this.segments = 0;
            this.createSegments(_segments);
        }
        set direction(_next) {
            if (this.dirCurrent.equals(ƒ.Vector3.SCALE(_next, -1)))
                return;
            console.log(this.dirCurrent, _next);
            this.dirNext = _next;
        }
        move() {
            this.dirCurrent = this.dirNext || this.dirCurrent;
            let nodes = this.getChildren();
            let nextTrans = ƒ.Vector3.SUM(nodes[0].mtxLocal.translation, this.dirCurrent);
            let tempTrans = nodes[0].mtxLocal.translation;
            for (let node of nodes) {
                tempTrans = node.mtxLocal.translation;
                node.mtxLocal.translation = nextTrans;
                nextTrans = tempTrans;
            }
        }
        grow() {
            let segment = new ƒ.Node("Segment");
            let mesh = new ƒ.MeshQuad();
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            segment.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
            segment.addComponent(cmpMaterial);
            let translation;
            if (this.segments == 0)
                translation = ƒ.Vector3.ZERO();
            else {
                translation = this.getChildren()[this.segments - 1].mtxLocal.translation;
                translation.add(ƒ.Vector3.SCALE(this.dirCurrent, -1));
            }
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(translation));
            segment.addComponent(cmpTransform);
            this.addChild(segment);
            this.segments++;
        }
        createSegments(_segments) {
            for (let i = 0; i < _segments; i++) {
                this.grow();
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
        }
    }
    Snake_1.Snake = Snake;
})(Snake || (Snake = {}));
//# sourceMappingURL=Snake.js.map