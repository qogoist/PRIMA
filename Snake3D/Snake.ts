namespace Snake3D {
    import ƒ = FudgeCore;

    export class Snake extends ƒ.Node {

        public segments: number;
        public head: SnakeSegment;

        private dirCurrent: ƒ.Vector3;
        private dirNext: ƒ.Vector3;

        constructor(_name: string, _segments: number) {
            ƒ.Debug.log("Creating new Snake...");
            super(_name);

            this.segments = 0;
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

            let mtxNext: ƒ.Matrix4x4 = child.mtxLocal.copy;
            mtxNext.translate(this.dirCurrent);

            let cmpNext: ƒ.ComponentTransform = new ƒ.ComponentTransform(mtxNext);

            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(ƒ.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNext);
                cmpNext = cmpPrev;
            }
        }

        // public move(): void {
        //     this.dirCurrent = this.dirNext || this.dirCurrent;

        //     let nodes: ƒ.Node[] = this.getChildren();

        //     let nextTrans: ƒ.Vector3 = ƒ.Vector3.SUM(nodes[0].mtxLocal.translation, this.dirCurrent);
        //     let tempTrans: ƒ.Vector3 = nodes[0].mtxLocal.translation;

        //     for (let node of nodes) {
        //         tempTrans = node.mtxLocal.translation;
        //         node.mtxLocal.translation = nextTrans;
        //         nextTrans = tempTrans;
        //     } 
        // }

        public grow(): void {
            let segment: SnakeSegment = new SnakeSegment("Segment");

            let translation: ƒ.Vector3;

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

        public rotate(_rotation: ƒ.Vector3): void {
            this.head.mtxLocal.rotate(_rotation);
        }

        private createSegments(_segments: Number): void {
            for (let i: number = 0; i < _segments; i++) {
                this.grow();
            }
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY()));

            this.head = <SnakeSegment>this.getChildren()[0];
        }

    }
}