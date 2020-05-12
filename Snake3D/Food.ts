namespace Snake3D {
    import ƒ = FudgeCore;

    export class Food extends ƒ.Node implements CollisionSphere {

        public radius: number;
        public position: ƒ.Matrix4x4;

        constructor(_name: string) {
            ƒ.Debug.log("Creating new Food...");
            super(_name);
            this.createComponents();
            this.radius = 0.5;
            this.position = this.mtxLocal;
        }

        public randomizeLocation(): void {
            let rnd: ƒ.Random = new ƒ.Random();
            let height: number = viewport.getClientRectangle().height;
            let width: number = viewport.getClientRectangle().width;

            let x: number = rnd.getRangeFloored(0, width);
            let y: number = rnd.getRangeFloored(0, height);

            let pos2D: ƒ.Vector2 = viewport.pointClientToProjection(new ƒ.Vector2(x, y));

            pos2D.scale(50);
            pos2D.x = Math.floor(pos2D.x);
            pos2D.y = Math.floor(pos2D.y);

            let position: ƒ.Vector3 = pos2D.toVector3();

            ƒ.Debug.log("Food at: " + position.toString());

            this.mtxLocal.translation = position;
        }

        public setLocation(_position: ƒ.Vector3): void {
            this.mtxLocal.translation = _position;
        }

        private createComponents(): void {
            let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));

            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            this.addComponent(cmpMesh);

            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidRed);
            this.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
        }
    }
}