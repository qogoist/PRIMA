"use strict";
var Snake;
(function (Snake_1) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor(_name, _segments) {
            ƒ.Debug.log("Creating new Snake...");
            super(_name);
            this.segments = 0;
            this.createSegments(_segments);
            this.dirCurrent = ƒ.Vector3.X();
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
            let segment = new Snake_1.SnakeSegment("Segment");
            let translation;
            if (this.segments == 0)
                translation = ƒ.Vector3.ZERO();
            else
                translation = this.getChildren()[this.segments - 1].mtxLocal.translation;
            if (this.dirCurrent == null)
                translation.add(new ƒ.Vector3(-1, 0, 0));
            segment.mtxLocal.translation = translation;
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