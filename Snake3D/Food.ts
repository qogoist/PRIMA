namespace Snake3D {
    import ƒ = FudgeCore;

    export class Food extends ƒ.Node implements CollisionSphere {

        public radius: number;
        private surfacePos: number;

        constructor(_name: string, _cubeSize: number) {
            ƒ.Debug.log("Creating new Food...");
            super(_name);
            this.createComponents();
            this.surfacePos = _cubeSize / 2 + 1;
            this.radius = 0.5;
            this.randomizeLocation();
        }

        public randomizeLocation(): void {
            let rnd: ƒ.Random = new ƒ.Random();

            let randomCoord: number = rnd.getRangeFloored(0, 3);
            let x: number;
            let y: number;
            let z: number;

            switch (randomCoord) {
                case 0:
                    x = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
                    y = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
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
                    y = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
                    z = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
                    break;

                case 2:
                    x = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
                    if (rnd.getBoolean())
                        y = this.surfacePos;
                    else
                        y = -this.surfacePos;
                    z = rnd.getRangeFloored(- (this.surfacePos - 1), this.surfacePos - 1);
                    break;
            }


            let position: ƒ.Vector3 = new ƒ.Vector3(x, y, z);

            ƒ.Debug.log("Food at: " + position.toString());

            this.mtxLocal.translation = position;
        }

        public collidesWith(_target: CollisionSphere): boolean {
            let distance: number = ƒ.Vector3.DIFFERENCE(this.mtxLocal.translation, _target.getComponent(ƒ.ComponentTransform).local.translation).magnitude;
            let result: boolean = false;

            if (distance < this.radius + _target.radius)
                result = true;

            return result;
        }

        private createComponents(): void {
            let mesh: ƒ.MeshCube = new ƒ.MeshCube();
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