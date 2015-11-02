/**
 * Created by siobhan on 15/10/08.
 */
var Task = function(taskData){

    this.type = taskData["taskType"];
    this.time = Math.round(taskData["timeTaken"]/10)/100;
    this.objects = taskData["objects"];
    this.targets = taskData["targets"];
    this.num = taskData["taskNo"];
    //console.log(taskData["taskNo"]);
};

 Task.prototype.process = function (){
    //this.accuracy = calcAccuracy();
    //this.score = calcScore();
    this.distance = calcDistance(this.type, this.objects, this.targets, this.num );
    this.angle = calcAngle(this.type, this.objects, this.targets, this.num );
};

var calcDistance = function(type, objects, targets){

    var distance = 0;
    if(type != "roomScene"){
        var obj = objects[0].position;
        var targ = targets[0].position;
        distance += Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));
    }
    else{
        var obj = objects[0].position;
        distance -= 50;
        var targ = objects[1].position;
        distance += Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));
  }
    return distance;
};

var calcAngle = function(type, objects, targets, tasknum){

    var accumTheta = 0;

    if(type === "dodecahedronScene") {
        var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[0].rotation._x, objects[0].rotation._y, objects[0].rotation._z, objects[0].rotation._order));
        var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(targets[0].rotation._x, targets[0].rotation._y, targets[0].rotation._z, targets[0].rotation._order));

        var dot = innerProduct(obj.toArray(), tar.toArray());
        var theta = Math.acos(2 * (dot * dot) - 1);
        accumTheta += theta;

    }
    else if(type === "alignScene") {

        targets[0].rotation._x = 0;
        targets[0].rotation._y = 0;
        targets[0].rotation._z = 0;

        if(tasknum === 1){
            targets[0].rotation._x = -Math.PI/4;
        }
        else if(tasknum === 2){
            targets[0].rotation._x = -Math.PI/2;
            targets[0].rotation._y = -Math.PI/4;
        }
        else if(tasknum === 3){
            targets[0].rotation._x = Math.PI/4;
        }
        else if (tasknum === 4){
            targets[0].rotation._x = Math.PI/2;
            targets[0].rotation._y = -Math.PI/4;
        }
        else{
            return 0;
        }
        objects[0].rotation._z = 0;

        var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[0].rotation._x, objects[0].rotation._y, objects[0].rotation._z, objects[0].rotation._order));
        var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(targets[0].rotation._x, targets[0].rotation._y, targets[0].rotation._z, targets[0].rotation._order));

        obj = taitConversion(obj);
        tar = taitConversion(tar);

        var dot = innerProduct(obj.toArray(), tar.toArray());
        var theta = Math.acos(2 * (dot * dot) - 1);
        accumTheta += theta;

        //console.log(obj, tar);
    }
    else if(type === "roomScene"){
        var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[0].rotation._x, objects[0].rotation._y, objects[0].rotation._z, objects[0].rotation._order));
        var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[1].rotation._x, objects[1].rotation._y, objects[1].rotation._z, objects[1].rotation._order));
        var dot = innerProduct(obj.toArray(), tar.toArray());
        var theta = Math.acos(2 * (dot * dot) - 1);
        accumTheta = theta;
        console.log(objects[0].rotation, objects[1].rotation);
    }

    if(accumTheta >= Math.PI/2){
        accumTheta =  Math.PI - accumTheta;
    }

    return accumTheta;

};


var taitConversion = function(quart){

    var tait = new THREE.Vector3();
    tait.x = Math.atan2((quart.y * quart.z + quart.w * quart.x), 1/2 - (Math.pow(quart.x, 2) + Math.pow(quart.y, 2)));
    tait.y = Math.asin(-2 * (quart.x * quart.z - quart.w * quart.y));
    tait.z = Math.atan2((quart.x * quart.y + quart.w * quart.z), 1/2 - (Math.pow(quart.y, 2) + Math.pow(quart.z, 2)));

    tait.z = 0;

    tait.x = tait.x/2;
    tait.y = tait.y/2;
    tait.z = tait.z/2;

    var w = Math.cos(tait.z) * Math.cos(tait.y) * Math.cos(tait.x) + Math.sin(tait.z) * Math.sin(tait.y) * Math.sin(tait.x);
    var x = Math.cos(tait.z) * Math.cos(tait.y) * Math.sin(tait.x) - Math.sin(tait.z) * Math.sin(tait.y) * Math.cos(tait.x);
    var y = Math.cos(tait.z) * Math.sin(tait.y) * Math.cos(tait.x) + Math.sin(tait.z) * Math.cos(tait.y) * Math.sin(tait.x);
    var z = Math.sin(tait.z) * Math.cos(tait.y) * Math.cos(tait.x) - Math.cos(tait.z) * Math.sin(tait.y) * Math.sin(tait.x);

    return new THREE.Quaternion(x, y, z, w);
};

var innerProduct = function(object, target){
    var sum = 0;

    for(var i = 0; i < object.length; i++){
        sum += object[i] * target[i];
    }

    return sum;
};

var calcAccuracy = function(){
    return 0;
};

var calcScore = function(){
    return 0;
};