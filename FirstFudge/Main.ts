namespace FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;
    
    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ƒ.Debug.log(canvas);

        let node: ƒ.Node = new ƒ.Node("Cube");

        let mesh: ƒ.MeshCube = new ƒ.MeshCube();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.translateY(2);
        cmpCamera.pivot.translateX(2);
        cmpCamera.pivot.rotateY(200);
        cmpCamera.pivot.rotateX(20);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();
    }
}