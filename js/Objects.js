var Objects;
var player, ground, pointLight, hemLight, camera, coin, box, followPoint, o;


var coinPos = 1.7;
var randNum;
var randomX, randomZ, randomSize;

var obstacles = [];
var coins =[];

var levelSpeed = 2;
// var meshArr = [];
// var mergedMesh;
var ns = 7;
var s = 7;
var j = 0.5;



Objects = {

    lights: function () {
        pointLight = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 80), scene);
        hemLight = new BABYLON.HemisphericLight('hemi1', new BABYLON.Vector3(40, 0, 200), scene);
        hemLight.diffuse = new BABYLON.Color3(1, 1, 1);
        hemLight.specular = new BABYLON.Color3(1, 1, 1);
        hemLight.groundColor = new BABYLON.Color3(0, 0, 0);
    },

    camera: function () {

        camera = new BABYLON.FollowCamera("camera", new BABYLON.Vector3(-20, 0, -80), scene);
        camera.heightOffset = 10; //how high up from the object to place the camera
        camera.radius = 60; // how far from the object to follow
        camera.rotationOffset = 90; //rotate around the object (if it's imported strangely or you want to follow from the front)




        camera.attachControl(canvas, true);



        // camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 150, BABYLON.Vector3.Zero(), scene);


        // var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(30, 10, -40), scene);
        // camera.attachControl(canvas, true);
        // // camera.lockedTarget = player;
        //
        //
        // camera.radius = 200; // how far from the object to follow
        // camera.heightOffset = 2; // how high above the object to place the camera
        // camera.rotationOffset = 90; // the viewing angle
        camera.cameraAcceleration = 0.3; // how fast to move
        camera.maxCameraSpeed = 200;// speed limit
        //
        // scene.activeCamera = camera;
    },

    player: function () {
        //Player setup and physics
        followPoint = BABYLON.Mesh.CreateBox("followPoint", 0.01, scene);
        player = BABYLON.Mesh.CreateSphere('player', 12, 4, scene);
        player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 1, restitution: 0.001, friction:1}, scene);
        var playerMaterial = new BABYLON.StandardMaterial("player", scene);
        playerMaterial.diffuseTexture = new BABYLON.Texture("sprites/chicken.jpg", scene);
        player.material = playerMaterial;
        //player initial position
        player.position.x = 0;
        player.position.z = 0;
        player.position.y = 2;
        player.wireframe = true;


        player.points = 0;

        player.life = 10;

        player.speed = 0.5;

        player.mvtDirection = [0, 0, 0, 0, 0];

        window.addEventListener("keyup", function (evt) {
            Objects.handleKeyUp(evt.keyCode);
        });
        window.addEventListener("keydown", function (evt) {
            Objects.handleKeyDown(evt.keyCode);
        });
        player.DIRECTIONS = {
            QWSD : {
                TOP     : 87,
                BOT     : 83,
                LEFT    : 65,
                RIGHT   : 68,
                JUMP    : 32
            }
        };

    },
    


    update : function() {
        Objects.move();
        document.getElementById("life").innerHTML = "Life : "+player.life;
        document.getElementById("points").innerHTML = "Points : "+player.points;
        if(player.position.y < -1){
            player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
            player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
            player.position.y = 2;
            player.position.x = 0;
            player.position.z = 0;

        } else if(player.position.z < -148){
            player.position.z = -148;
            player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
            player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, s), player.getAbsolutePosition());
        } else if(player.position.z > 148){
            player.position.z = 147;
            player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));
            player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -s), player.getAbsolutePosition());
        }




        //
        // if(player.intersectsMesh(o, false)){
        //     console.log("hit");
        // }

        // if(player.x > b.position.x && player.x > coin.position.x){
        //     b.dispose();
        //     b.Mesh = null;
        //     coin.dispose();
        //     coin.Mesh = null;
        // }




        

    },

    pointSystem:function(){

    },

    chooseDirection : function(direction, value) {
        player.mvtDirection[direction] = value;
    },

    handleKeyDown : function(keycode) {
        switch (keycode) {

            case player.DIRECTIONS.QWSD.TOP :
                Objects.chooseDirection(0, 1);
                console.log("Up");
                break;
            case player.DIRECTIONS.QWSD.BOT :
                Objects.chooseDirection(1, 1);
                console.log("Down");
                break;
            case player.DIRECTIONS.QWSD.LEFT :
                Objects.chooseDirection(2, 1);
                console.log("Left");
                break;
            case player.DIRECTIONS.QWSD.RIGHT :
                Objects.chooseDirection(3, 1);
                console.log("Right");
                break;
            case player.DIRECTIONS.QWSD.JUMP :
                Objects.chooseDirection(4, 1);
                console.log("Jump");
                // Objects.jumpSound.play();
                break;
        }
    },

    handleKeyUp : function(keycode) {

        switch (keycode) {

            case player.DIRECTIONS.QWSD.TOP :
                Objects.chooseDirection(0,0);
                break;
            case player.DIRECTIONS.QWSD.BOT :
                Objects.chooseDirection(1, 0);
                break;
            case player.DIRECTIONS.QWSD.LEFT :
                Objects.chooseDirection(2, 0);
                break;
            case player.DIRECTIONS.QWSD.RIGHT :
                Objects.chooseDirection(3, 0);
                break;
            case player.DIRECTIONS.QWSD.JUMP :
                Objects.chooseDirection(4, 0);
                // Objects.jumpSound.stop();
                break;

        }
        Objects.chooseDirection();
    },

    move:function(){


        if (player.mvtDirection[0] != 0) {
            // player.physicsImpostor.applyImpulse(new BABYLON.Vector3(-s, 0, 0), player.getAbsolutePosition());
        }
        if (player.mvtDirection[1] != 0) {
            // player.physicsImpostor.applyImpulse(new BABYLON.Vector3(s, 0, 0), player.getAbsolutePosition());

        }
        if (player.mvtDirection[2] != 0) {
            player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, -s), player.getAbsolutePosition());
            // player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(-s,0,0));
        }
        if (player.mvtDirection[3] != 0) {
            player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 0, s), player.getAbsolutePosition());
            // player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(s,0,0));
        }
        if (player.mvtDirection[4] != 0) {

            if(player.position.y <= 6){
            player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, j, 0), player.getAbsolutePosition());
                // player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,j,0));
                // player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(-1,j,-1));

            } else {
                console.log("too soon");

            }


        }


        followPoint.position.x = player.position.x;
        // followPoint.position.y = player.position.y;
        followPoint.position.z = player.position.z;

        // player.physicsImpostor.linearVelocity.scaleEqual(0.92);
        // player.physicsImpostor.angularVelocity.scaleEqual(0);



        // player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
        player.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0,0,0));



        // camera.position.z = player.position.z-40;
        // camera.position.x = player.position.x+10;


        
    },

    coins:function(){
        coin = BABYLON.Mesh.CreateCylinder("coin", 0.2, 3.2, 3.2, 12, 1, scene, false);
        coin.position.x = randomX;
        coin.position.z = randomZ+50;
        coin.position.y = coinPos;
        coin.diffuseColor = new BABYLON.Color3(1.0,0.2,0.7);
        coin.rotation.x = Math.PI/2;

        coins.push(coin);

        // coin.physicsImpostor = new BABYLON.PhysicsImpostor(
        //     coin, BABYLON.PhysicsImpostor.BoxImpostor, {
        //         mass: 1, restitution: 0.00001 }, scene
        // );

    },
    
    addCoins:function(){
        for(var i=0; i<coins.length; i++){
            coins[i].position.x += levelSpeed;
            coins[i].rotation.z += Math.cos(alpha) / 25;
            if(coins[i].position.x >= player.position.x+50){
                coins[i].dispose();
                coins.splice(i,1);

            }
            if(coins.length >= 1) {
                if (coins[i].intersectsMesh(player, true)) {

                    coins[i].dispose();
                    coins.splice(i, 1);
                    player.points += 1;
                }
            }
        }
    },
    animate:function(){


        // console.log(b.position.x);

    },
    collision:function(){

    },

    nextLevel:function(){
       levelSpeed++;

        document.getElementById("nextLevel").innerHTML = "Level : "+levelSpeed;

    },
    level:function () {

        // meshArr = [ground, box, box1, box2, box3, obstacle];


        //ground/level setup and physics

        ground = BABYLON.Mesh.CreateGround('ground1', 1500, 300, 2, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 0, friction: 0.5, restitution: 0.9 }, scene);
        // var groundMaterial = new BABYLON.StandardMaterial("ground", scene);



        // groundMaterial.diffuseTexture = new BABYLON.Texture("sprites/redearth.png", scene);
        // groundMaterial.diffuseTexture.uScale = 400;
        // groundMaterial.diffuseTexture.vScale = 20;
        // groundMaterial.specularColor = new BABYLON.Color3(0,0,0);
        // ground.material = groundMaterial;
        // groundMaterial.bumpTexture = new BABYLON.Texture("sprites/sand.jpg", scene);
        ground.position.x = -390;

        //some obstacles



        // var box = BABYLON.MeshBuilder.CreateBox("box", {height: 10, width: 2, depth: 200}, scene);
        // box.position.x = -98;
        // box.position.y = 5;
        // box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
        //     mass: 0, friction: 2, restitution: 0.9 }, scene);
        // box.freezeWorldMatrix();
        //
        // var box1 = BABYLON.MeshBuilder.CreateBox("box1", {
        //     height: 10, width: 2, depth: 200}, scene);
        // box1.position.x = 98;
        // box1.position.y = 5;
        // box1.physicsImpostor = new BABYLON.PhysicsImpostor(
        //     box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0.9 }, scene);
        // box1.freezeWorldMatrix();
        //
        //
        // var box2 = BABYLON.MeshBuilder.CreateBox("box2", {
        //     height: 10, width: 200, depth: 2}, scene);
        // box2.position.z = 98;
        // box2.position.y = 5;
        //
        // box2.physicsImpostor = new BABYLON.PhysicsImpostor(
        //     box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0.9 }, scene);
        // box2.freezeWorldMatrix();
        //
        //
        //
        // var box3 = BABYLON.MeshBuilder.CreateBox("box3", {
        //     height: 10, width: 200, depth: 2}, scene);
        // box3.position.z = -98;
        // box3.position.y = 5;
        //
        // box3.physicsImpostor = new BABYLON.PhysicsImpostor(box3, BABYLON.PhysicsImpostor.BoxImpostor, {
        //     mass: 0, friction: 2, restitution: 0.9 }, scene);
        // box3.freezeWorldMatrix();
        //
        //
        //
        // var obstacle = BABYLON.MeshBuilder.CreateBox("obstacle", {
        //     height: 10, width: 20, depth: 20}, scene);
        // obstacle.position.z = -75;
        // obstacle.position.y = 5;
        //
        // obstacle.physicsImpostor = new BABYLON.PhysicsImpostor(obstacle, BABYLON.PhysicsImpostor.BoxImpostor, {
        //     mass: 0, friction: 5, restitution: 0.9 }, scene);
        // obstacle.freezeWorldMatrix();






    },

    generator:function () {
        //taken from Pixelcodr.com's tutorial on action managers, akkreditation to Julian Chenard

            randNum = function(min, max) {
            if(min == max) {
                return (min);
            }
            var random = Math.random();
            return ((random * (max-min)) + min);
        };
    },
    obstacle:function() {
        //taken from Pixelcodr.com's tutorial on action managers, akkreditation to Julian Chenard
    var minZ = camera.position.z -140;
    var maxZ = camera.position.z +140;
    var minX = camera.position.x -800;
    var maxX = camera.position.x -1400;
    var minSize = 5, maxSize = 30;



    randomX = randNum(minX, maxX);
    randomZ = randNum(minZ, maxZ);
    randomSize = randNum(minSize, maxSize);

    o = BABYLON.MeshBuilder.CreateBox("oo", {height: randomSize, width: 10, depth: randomSize+20}, scene);
    // o.physicsImpostor = new BABYLON.PhysicsImpostor(o, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.1, friction:0.1}, scene);
    // b.scaling.x = randNum(0.5, 1.5);
    // b.scaling.y = randNum(4, 8);
    // b.scaling.z = randNum(2, 3);
    o.wireframe = true;
    o.position.x = randomX;
    o.position.y = o.scaling.y/2 ;
    o.position.z = randomZ;

    // o.actionManager = new BABYLON.ActionManager(scene);

    obstacles.push(o);

},
    addObstacle:function(){
        for(var i=0; i<obstacles.length; i++){
            obstacles[i].position.x += levelSpeed;
            if(obstacles[i].position.x >= player.position.x+50) {
                obstacles[i].dispose();
                obstacles.splice(i, 1);
            }
            if(obstacles.length >= 1) {
                if (obstacles[i].intersectsMesh(player, true)) {
                    obstacles[i].dispose();
                    obstacles.splice(i, 1);
                    player.life -= 1;
                }
            }
        }
    }


};



