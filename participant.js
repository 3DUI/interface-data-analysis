/**
 * Created by siobhan on 15/10/08.
 */
var Participant = function (data){
    this.num = data["participantNo"];
    this.mrt = scoreMRT(data["mrt-answers"]);
    this.shadowSUS = scoreSUS(data["shadowbox-questionnaire"]["sus"]);
    this.standardSUS = scoreSUS(data["standard-questionnaire"]["sus"]);
    this.shadowTasks = loadTasks(data["shadowbox-tasks"]);
    this.standardTasks = loadTasks(data["standard-tasks"]);
};

var loadTasks = function(taskData){
    var tasks = {};
    tasks.training = [];
    tasks.alignScene = [];
    tasks.dodecahedronScene = [];
    tasks.roomScene = [];



    for(var i = 0; i < taskData.length; i++){
        var curr = new Task(taskData[i]);
        //curr.process();
        tasks[taskData[i]["taskType"]].push(curr);
    }
    return tasks;
}

//scoring MRT given the model answers
var scoreMRT = function(answers){
    var score = 0;

    for(var i = 0; i < answers.length; i++){
        if(answers[i][0] === MRT_ANSWERS[i][0] && answers[i][1] === MRT_ANSWERS[i][1]){
            score++;
        }
    }

    return score;
};

//scoring the SUS given the formula found in
//SUS: A Quick and Dirty Usability Scale by John Brooke
//http://www.usabilitynet.org/trump/documents/Suschapt.doc
var scoreSUS = function(answers){
    var score = 0;

    for(var i = 0; i < answers.length; i++){
        var current = answers[i];

        if(i+1 % 2 == 0){
            current--;
        }
        else{
            current = 5 - current;
        }
        score += current;
    }

    score *= 2.5;

    return score;

};
