"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    ƒ.RenderManager.initialize(true, true);
    let snake;
    let food;
    let game;
    let cube;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game = createGame(20);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);
        Snake3D.viewport = new ƒ.Viewport();
        Snake3D.viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Time.game.setScale(0.1);
        ƒ.Debug.log(Snake3D.viewport);
        Snake3D.viewport.draw();
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30, false);
    }
    function update(_event) {
        snake.move();
        moveCamera();
        checkCollision();
        Snake3D.viewport.draw();
    }
    function moveCamera() {
        let posCam = ƒ.Vector3.NORMALIZATION(snake.head.mtxLocal.translation, 50);
        Snake3D.viewport.camera.pivot.translation = posCam;
        Snake3D.viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
    }
    function checkCollision() {
        if (snake.head.collidesWith(food)) {
            snake.grow();
            food.randomizeLocation();
            let stop = false;
            while (!stop) {
                for (let segment of snake.getChildren()) {
                    if (!food.collidesWith(segment)) {
                        stop = true;
                        break;
                    }
                }
            }
            let timeScale = ƒ.Time.game.getScale();
            timeScale += 0.01;
            ƒ.Time.game.setScale(timeScale);
        }
        for (let i = 1; i < snake.getChildren().length; i++) {
            if (snake.head.collidesWith(snake.getChild(i))) {
                ƒ.Loop.stop();
                window.alert("Game Over.");
            }
        }
    }
    function control(_event) {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            snake.rotate(ƒ.Vector3.Z(90));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            snake.rotate(ƒ.Vector3.Z(-90));
    }
    function createGame(_cubeSize) {
        let graph = new ƒ.Node("Game");
        snake = new Snake3D.Snake("Snake", 4, _cubeSize);
        food = new Snake3D.Food("Food", _cubeSize);
        cube = new ƒ.Node("Cube");
        let mesh = new ƒ.MeshCube();
        let mtrSolidGray = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("GRAY", 1)));
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        // cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
        cube.addComponent(cmpMesh);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidGray);
        cube.addComponent(cmpMaterial);
        let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.IDENTITY());
        cmpTransform.local.scale(ƒ.Vector3.ONE(_cubeSize));
        cube.addComponent(cmpTransform);
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(0.1, 0.1, 0.1)));
        let cmpLightDirection = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 0, 0)));
        let cmpLightDirection2 = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(0, 0, 1)));
        let cmpLightDirection3 = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(0, 0, 1)));
        let cmpLightDirection4 = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 0, 0)));
        cmpLightDirection.pivot.lookAt(new ƒ.Vector3(0, -10, 10));
        cmpLightDirection2.pivot.lookAt(new ƒ.Vector3(10, 10, 0));
        cmpLightDirection3.pivot.lookAt(new ƒ.Vector3(-10, 10, 0));
        cmpLightDirection4.pivot.lookAt(new ƒ.Vector3(0, -10, -10));
        graph.addComponent(cmpLightAmbient);
        graph.addComponent(cmpLightDirection);
        graph.addComponent(cmpLightDirection2);
        graph.addComponent(cmpLightDirection3);
        graph.addComponent(cmpLightDirection4);
        graph.addChild(snake);
        graph.addChild(food);
        graph.addChild(cube);
        return graph;
    }
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Main.js.map