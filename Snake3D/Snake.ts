namespace Snake3D {
    import ƒ = FudgeCore;

    export class Snake extends ƒ.Node {

        public segments: number;
        public head: SnakeSegment;

        private dirCurrent: ƒ.Vector3;
        private dirNext: ƒ.Vector3;
        private wrap: number;

        constructor(_name: string, _segments: number, _cubeSize: number) {
            ƒ.Debug.log("Creating new Snake...");
            super(_name);

            this.segments = 0;
            this.wrap = _cubeSize / 2 + 2;
            this.createSegments(_segments);
            this.dirCurrent = ƒ.Vector3.X();

        }

        public set direction(_next: ƒ.Vector3) {
            if (this.dirCurrent.equals(ƒ.Vector3.SCALE(_next, -1)))
                return;
            console.log(this.dirCurrent, _next);
            this.dirNext = _next;
        }

        public move(): void {
            this.dirCurrent = this.dirNext || this.dirCurrent;
            let child: ƒ.Node = this.head;
            let cmpPrev: ƒ.ComponentTransform = child.getComponent(ƒ.ComponentTransform);

            let mtxNext: ƒ.Matrix4x4;

            while (true) {
                mtxNext = cmpPrev.local.copy;
                mtxNext.translate(this.dirCurrent);

                if (Math.abs(mtxNext.translation.x) < this.wrap && Math.abs(mtxNext.translation.y) < this.wrap && Math.abs(mtxNext.translation.z) < this.wrap)
                    break;
                this.rotate(ƒ.Vector3.Y(90));
            }

            let cmpNext: ƒ.ComponentTransform = new ƒ.ComponentTransform(mtxNext);

            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(ƒ.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNext);
                cmpNext = cmpPrev;
            }
        }

        public grow(_initialCreation: boolean = false): void {
            let segment: SnakeSegment = new SnakeSegment("Segment");

            if (_initialCreation) {
                segment.mtxLocal.translateZ(this.wrap - 2);
            }

            this.addChild(segment);
            this.segments++;
        }

        public rotate(_rotation: ƒ.Vector3): void {
            ƒ.Debug.log("Rotating");
            this.head.mtxLocal.rotate(_rotation);
        }

        private createSegments(_segments: Number): void {
            for (let i: number = 0; i < _segments; i++) {
                this.grow(true);
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));

            this.head = <SnakeSegment>this.getChildren()[0];
        }

    }
}