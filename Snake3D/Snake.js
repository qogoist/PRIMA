"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor(_name, _segments, _cubeSize) {
            ƒ.Debug.log("Creating new Snake...");
            super(_name);
            this.segments = 0;
            this.wrap = _cubeSize / 2 + 2;
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
            let child = this.head;
            let cmpPrev = child.getComponent(ƒ.ComponentTransform);
            let mtxNext;
            while (true) {
                mtxNext = cmpPrev.local.copy;
                mtxNext.translate(this.dirCurrent);
                if (Math.abs(mtxNext.translation.x) < this.wrap && Math.abs(mtxNext.translation.y) < this.wrap && Math.abs(mtxNext.translation.z) < this.wrap)
                    break;
                this.rotate(ƒ.Vector3.Y(90));
            }
            let cmpNext = new ƒ.ComponentTransform(mtxNext);
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(ƒ.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNext);
                cmpNext = cmpPrev;
            }
        }
        grow(_initialCreation = false) {
            let segment = new Snake3D.SnakeSegment("Segment");
            if (_initialCreation) {
                segment.mtxLocal.translateZ(this.wrap - 2);
            }
            this.addChild(segment);
            this.segments++;
        }
        rotate(_rotation) {
            ƒ.Debug.log("Rotating");
            this.head.mtxLocal.rotate(_rotation);
        }
        createSegments(_segments) {
            for (let i = 0; i < _segments; i++) {
                this.grow(true);
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));
            this.head = this.getChildren()[0];
        }
    }
    Snake3D.Snake = Snake;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Snake.js.map