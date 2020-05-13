namespace Snake3D {
    import ƒ = FudgeCore;

    export let viewport: ƒ.Viewport;

    let snake: Snake;
    let food: Food;
    let game: ƒ.Node;
    let cube: ƒ.Node;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game = createGame(20);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        ƒ.Time.game.setScale(0.1);

        ƒ.Debug.log(viewport);

        viewport.draw();

        document.addEventListener("keydown", control);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30, false);
    }

    function update(_event: Event): void {
        snake.move();

        let posCam: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(snake.head.mtxLocal.translation, 50);
        viewport.camera.pivot.translation = posCam;
        viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO(), ƒ.Vector3.Y());

        checkCollision();

        viewport.draw();
    }

    function checkCollision(): void {
        if (snake.head.collidesWith(food)) {
            snake.grow();
            food.randomizeLocation();

            let stop: boolean = false;
            while (!stop) {

                for (let segment of snake.getChildren()) {
                    if (!food.collidesWith(<CollisionSphere>segment)) {
                        stop = true;
                        break;
                    }
                }
            }

            let timeScale: number = ƒ.Time.game.getScale();
            timeScale += 0.01;
            ƒ.Time.game.setScale(timeScale);
        }

        for (let i: number = 1; i < snake.getChildren().length; i++) {
            if (snake.head.collidesWith(<CollisionSphere>snake.getChildren()[i])) {
                ƒ.Loop.stop();
                window.alert("Game Over.");
            }
        }
    }

    function control(_event: Event): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            snake.rotate(ƒ.Vector3.Z(90));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            snake.rotate(ƒ.Vector3.Z(-90));
    }

    function createGame(_cubeSize: number): ƒ.Node {
        let node: ƒ.Node = new ƒ.Node("Game");

        snake = new Snake("Snake", 4, _cubeSize);
        food = new Food("Food", _cubeSize);

        cube = new ƒ.Node("Cube");

        let mesh: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GRAY")));

        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        // cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
        cube.addComponent(cmpMesh);

        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidGray);
        cube.addComponent(cmpMaterial);

        let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
        cmpTransform.local.scale(ƒ.Vector3.ONE(_cubeSize));
        cube.addComponent(cmpTransform);

        node.addChild(snake);
        node.addChild(food);
        node.addChild(cube);


        return node;
    }
}