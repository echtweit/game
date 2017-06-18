var scene, canvas, engine;
var alpha = Math.PI;
var playAmbience = false;
var Game = {
    

    init:function(){
        console.log("Game.init is running");
        canvas = document.getElementById("ctx");
        engine = new BABYLON.Engine(canvas,true);
        scene = new BABYLON.Scene(engine);
        scene.ambientColor = new BABYLON.Color3(0.3,0.3,0.3);
        scene.activeCamera = camera;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogDensity = 0.002;

        Preloader.load();
        
    },
    pressPlay:function(){
        document.getElementById("start").onclick = function() {
            playAmbience = true;
            Game.setupGame();
            document.getElementById("start").remove();

        };

        // if(playAmbience === true){
        //     Objects.ambSound.play();
        // };

    },

    setupGame:function(){
        console.log("setting up game");

        //enabeling physics and gravity

        var gravityVector = new BABYLON.Vector3(0,-9,0,0);
        var physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(gravityVector, physicsPlugin);

        setInterval(Objects.obstacle, 600);
        setInterval(Objects.coins, 1000);
        
        setInterval(Objects.nextLevel, 10000);
        //adding Lights
        Objects.lights();

        //adding Camera
        Objects.camera();
        Objects.pointSystem();
        //adding Player
        Objects.player();
        Objects.level();
        Objects.generator();
        Objects.coins();
        // Objects.obstacle();



        
        camera.lockedTarget = followPoint;
        //Registering things to be rendered, before going to render, or something... idk.
        scene.registerBeforeRender(function(){
            Objects.update();
            Objects.collision();
            // Objects.animate();
            Objects.addObstacle();
            Objects.addCoins();
            playAmbience = true;

        });

        scene.getAnimationRatio();

        //render loop for rendering the scene
        engine.runRenderLoop(function () {

            scene.render();
        });



        //resizes window on -yeah duh.
        window.addEventListener('resize', function() {
            engine.resize();
        });
    }
};

