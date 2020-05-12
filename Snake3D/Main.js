"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    let snake;
    let food;
    let game;
    let head;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game = new ƒ.Node("Game");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);
        Snake3D.viewport = new ƒ.Viewport();
        Snake3D.viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log(Snake3D.viewport);
        snake = new Snake3D.Snake("Snake", 4);
        food = new Snake3D.Food("Food");
        head = snake.getChildren()[0];
        Snake3D.viewport.draw();
        game.addChild(snake);
        // game.addChild(food);
        // food.randomizeLocation();
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 2, false);
    }
    function update(_event) {
        snake.move();
        // checkCollision();
        Snake3D.viewport.draw();
    }
    // function checkCollision(): void {
    //     if (head.collidesWith(food))
    //         snake.grow();
    // }
    function control(_event) {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            snake.direction = ƒ.Vector3.X(-1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            snake.direction = ƒ.Vector3.X(1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]))
            snake.direction = ƒ.Vector3.Y(1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            snake.direction = ƒ.Vector3.Y(-1);
    }
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Main.js.map