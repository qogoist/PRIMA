namespace Snake {
    import ƒ = FudgeCore;

    export let viewport: ƒ.Viewport;

    let snake: Snake;
    let food: Food;
    let game: ƒ.Node;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game = new ƒ.Node("Game");

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        ƒ.Debug.log(viewport);

        snake = new Snake("Snake", 4);
        food = new Food("Food");

        viewport.draw();

        game.addChild(snake);
        game.addChild(food);

        food.randomizeLocation();

        document.addEventListener("keydown", hndKey);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 1, false);
    }

    function update(_event: Event): void {
        snake.move();

        let distanceToFood: number = ƒ.Vector3.DIFFERENCE(snake.getChildren()[0].mtxLocal.translation, food.mtxLocal.translation).magnitude;
        let allowedDistance: number = 1;

        if (distanceToFood < allowedDistance)
            snake.grow();


        viewport.draw();
    }

    function hndKey(_event: Event): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            snake.direction = ƒ.Vector3.X(-1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            snake.direction = ƒ.Vector3.X(1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]))
            snake.direction = ƒ.Vector3.Y(1);
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            snake.direction = ƒ.Vector3.Y(-1);
    }
}