/**
 * Created by siobhan on 15/10/08.
 */
var Task = function(taskData){
    this.type = taskData["taskType"];
    this.time = taskData["timeTaken"];
    this.accuracy = calcAccuracy(taskData["objects"], taskData["targets"])
    this.score = calcScore();
};

var calcAccuracy = function(objects, targets){

    //var accuracy = {};
    //
    //for(var i = 0; i < objects.length; i++){
    //    accuracy[0]
    //}
    var obj = objects[0].position;
    var targ = targets[0].position;

    var distance = Math.sqrt(Math.pow((obj.x - targ.x), 2) + Math.pow((obj.y - targ.y), 2) + Math.pow((obj.z - targ.z), 2));

    return distance;
};

var calcScore = function(){
    return 0;
};