namespace FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ƒ.Debug.log(canvas);

        let node: ƒ.Node = new ƒ.Node("Cube1");
        let node2: ƒ.Node = new ƒ.Node("Cube2");
        let node3: ƒ.Node = new ƒ.Node("cube3");
        node.addChild(node2);
        node.addChild(node3);

        let mesh: ƒ.MeshCube = new ƒ.MeshCube();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        let cmpMesh2: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        let cmpMesh3: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        node2.addComponent(cmpMesh2);
        node3.addComponent(cmpMesh3);

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
        let cmpMaterial2: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidRed);
        let cmpMaterial3: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidRed);
        node2.addComponent(cmpMaterial2);
        node3.addComponent(cmpMaterial3);

        let transform: ƒ.Matrix4x4 = new ƒ.Matrix4x4();
        transform.translateZ(-2);
        transform.translateX(2);
        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(transform);
        node2.addComponent(cmpTransform);

        let transform2: ƒ.Matrix4x4 = new ƒ.Matrix4x4();
        transform2.translateZ(-2);
        transform2.scale(new ƒ.Vector3(0.5, 0.5, 0.5));
        let cmpTransform2: ƒ.ComponentTransform = new ƒ.ComponentTransform(transform2);
        node3.addComponent(cmpTransform2);

        ƒ.Debug.log(node);

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