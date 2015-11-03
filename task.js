/**
 * Created by siobhan on 15/10/08.
 */
var Task = function(taskData){

    this.type = taskData["taskType"];
    this.num = taskData["taskNo"];
    this.time = Math.round(taskData["timeTaken"]/10)/100;
    this.objects = taskData["objects"];
    this.target = setupTargets(taskData["targets"][0], this.num, this.type);
    this.distance = setupDistance(this.type, this.objects, this.target);
    this.angle = setupAngle(this.type, this.objects, this.target );
};

var getDistance = function(obj, targ){
    return Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));
};

var setupTargets = function(target, tasknum, tasktype){

    if(tasktype === "alignScene"){
        target.rotation._x = 0;
        target.rotation._y = 0;
        target.rotation._z = 0;

        if(tasknum === 1){
            target.rotation._x = -Math.PI/4;
        }
        else if(tasknum === 2){
            target.rotation._x = -Math.PI/2;
            target.rotation._y = -Math.PI/4;
        }
        else if(tasknum === 3){
            target.rotation._x = Math.PI/4;
        }
        else if (tasknum === 4){
            target.rotation._x = Math.PI/2;
            target.rotation._y = -Math.PI/4;
        }
    }
    return target;

};

var setupDistance = function(type, objects, target){

    if(type === "roomScene"){
        var distance = [];
        distance.push(Math.abs(getDistance(objects[0].position, objects[1].position) - 50));
        distance.push(getDistance(objects[1].position, objects[2].position) - 10);
        return distance;
    }
    else{
        return getDistance(objects[0].position, target.position);
    }

};

var createQuat = function(object){
    return new THREE.Quaternion().setFromEuler(new THREE.Euler(object.rotation._x, object.rotation._y, object.rotation._z, object.rotation._order));
};

var distBetweenQuats = function(object, target){
    var dot = innerProduct(object.toArray(), target.toArray());
    var theta = Math.acos(2 * (dot * dot) - 1);


    if(theta >= Math.PI/2){
        theta =  Math.PI - theta;
    }

    return theta;
};

var setupAngle = function(type, objects, target){

    if(type === "dodecahedronScene") {
        var obj = createQuat(objects[0]);
        var tar = createQuat(target);
        return distBetweenQuats(obj, tar);
    }
    else if(type === "alignScene") {
        objects[0].rotation._z = 0;

        var obj = taitConversion(createQuat(objects[0]));
        var tar = taitConversion(createQuat(target));
        return distBetweenQuats(obj, tar);
    }
    else if(type === "roomScene"){
        var angle = [];

        var obj = createQuat(objects[0]);
        var tar = createQuat(objects[1]);
        angle.push(distBetweenQuats(obj, tar));

        obj = createQuat(objects[1]);
        tar = createQuat(objects[2]);
        angle.push(distBetweenQuats(obj, tar));
        return angle;
    }
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

var calcScore = function(){
    return 0;
};