var Preloader = {
    load:function(){
    //     var assetsManager = new BABYLON.AssetsManager(Game.scene);
    //     assetsManager.onFinish = function (tasks) {
    //         Game.setupGame();
    //         });
    //     };


        console.log("loading");
        var assetsManager = new BABYLON.AssetsManager(scene);



        var binaryTask = assetsManager.addBinaryFileTask("jump task", "sound/106 BASS Clean Classic.wav");
        binaryTask.onSuccess = function (task) {
            Objects.jumpSound = new BABYLON.Sound("jump", task.data, scene, {loop:false});
        };

        var binaryTask = assetsManager.addBinaryFileTask("hit task", "sound/pHit.wav");
        binaryTask.onSuccess = function (task) {
            Objects.hitSound = new BABYLON.Sound("hit", task.data, scene, {loop:false});
        };

        // var binaryTask = assetsManager.addBinaryFileTask("ambient task", "sound/partymix.wav");
        // binaryTask.onSuccess = function (task) {
        //     Objects.ambSound = new BABYLON.Sound("ambient", task.data, scene, {loop:true});
        // };


        assetsManager.onFinish = function (tasks) {
            console.log("loading finished, running Game.setupGame function")
            Game.pressPlay();
        };



        assetsManager.load();

    }
}