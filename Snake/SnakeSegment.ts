namespace Snake {
    import ƒ = FudgeCore;

    export class SnakeSegment extends ƒ.Node implements CollisionSphere {

        public radius: number;
        public position: ƒ.Matrix4x4;

        constructor(_name: string) {
            ƒ.Debug.log("Creating new SnakeSegment...");
            super(_name);
            this.createComponents();
            this.radius = 0.5;
            this.position = this.mtxLocal;
        }

        public collidesWith(_target: CollisionSphere): boolean {
            let distance: number = ƒ.Vector3.DIFFERENCE(this.position.translation, _target.position.translation).magnitude;
            let result: boolean = false;

            if (distance < this.radius + _target.radius)
                result = true;

            return result;
        }

        private createComponents(): void {
            let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));

            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            this.addComponent(cmpMesh);

            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
            this.addComponent(cmpMaterial);

            let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
            this.addComponent(cmpTransform);
        }
    }
}