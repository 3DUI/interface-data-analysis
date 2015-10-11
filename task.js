/**
 * Created by siobhan on 15/10/08.
 */
var Task = function(taskData){
    this.type = taskData["taskType"];
    this.time = Math.round(taskData["timeTaken"]/10)/100;
    this.distance = calcDistance(taskData["taskType"], taskData["objects"], taskData["targets"]);
    this.angle = calcAngle(taskData["taskType"], taskData["objects"], taskData["targets"]);
    this.accuracy = calcAccuracy();
    this.score = calcScore();
};



var calcDistance = function(type, objects, targets){

    var distance = 0;
    if(type != "roomScene"){
        for(var i = 0; i < targets.length; i++){
            var obj = objects[i].position;
            var targ = targets[i].position;

            distance += Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));
        }
    }
    else{

        var obj = objects[0].position;
        distance -= 50;
        var targ = objects[1].position;
        distance += Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));

        var obj = objects[2].position;
        distance -= 60;
        var targ = objects[0].position;
        distance -= 50;
        distance += Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));
    }
    return distance;
};

var calcAngle = function(type, objects, targets){

    var accumTheta = 0;

    if(type != "roomScene") {
        for (var i = 0; i < targets.length; i++) {

            var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[0].rotation._x, objects[0].rotation._y, objects[0].rotation._z, objects[0].rotation._order));
            var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(targets[0].rotation._x, targets[0].rotation._y, targets[0].rotation._z, targets[0].rotation._order));

            var dot = innerProduct(obj.toArray(), tar.toArray());
            var theta = Math.acos(2 * (dot * dot) - 1);
            accumTheta += theta;
        }
    }
    else{
        var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[0].rotation._x, objects[0].rotation._y, objects[0].rotation._z, objects[0].rotation._order));
        var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[1].rotation._x, objects[1].rotation._y, objects[1].rotation._z, objects[1].rotation._order));
        var dot = innerProduct(obj.toArray(), tar.toArray());
        var theta = Math.acos(2 * (dot * dot) - 1);
        accumTheta += theta;

        var obj = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[2].rotation._x, objects[2].rotation._y, objects[2].rotation._z, objects[2].rotation._order));
        var tar = new THREE.Quaternion().setFromEuler(new THREE.Euler(objects[1].rotation._x, objects[1].rotation._y, objects[1].rotation._z, objects[1].rotation._order));
        var dot = innerProduct(obj.toArray(), tar.toArray());
        var theta = Math.acos(2 * (dot * dot) - 1);
        accumTheta += theta;

    }

    return accumTheta;

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