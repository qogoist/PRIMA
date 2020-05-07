"use strict";
var Snake;
(function (Snake) {
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
        Snake.viewport = new ƒ.Viewport();
        Snake.viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log(Snake.viewport);
        snake = new Snake.Snake("Snake", 4);
        food = new Snake.Food("Food");
        head = snake.getChildren()[0];
        Snake.viewport.draw();
        game.addChild(snake);
        game.addChild(food);
        food.randomizeLocation();
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 2, false);
    }
    function update(_event) {
        snake.move();
        checkCollision();
        Snake.viewport.draw();
    }
    function checkCollision() {
        if (head.collidesWith(food))
            snake.grow();
    }
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
})(Snake || (Snake = {}));
//# sourceMappingURL=Main.js.map