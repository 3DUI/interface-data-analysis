/**
 * Created by siobhan on 15/10/08.
 */

    MRT_ANSWERS = [[1, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [2, 4], [1, 4], [3, 4], [2, 3], [1, 2], [2, 4], [2, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [1, 4], [1, 3]];

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

