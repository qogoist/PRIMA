"use strict";
var Snake;
(function (Snake) {
    var ƒ = FudgeCore;
    let snake;
    let food;
    let game;
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
        Snake.viewport.draw();
        game.addChild(snake);
        game.addChild(food);
        food.randomizeLocation();
        document.addEventListener("keydown", hndKey);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 1, false);
    }
    function update(_event) {
        snake.move();
        let distanceToFood = ƒ.Vector3.DIFFERENCE(snake.getChildren()[0].mtxLocal.translation, food.mtxLocal.translation).magnitude;
        let allowedDistance = 1;
        if (distanceToFood < allowedDistance)
            snake.grow();
        Snake.viewport.draw();
    }
    function hndKey(_event) {
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