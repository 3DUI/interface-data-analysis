/**
 * Created by siobhan on 15/10/08.
 */

    MRT_ANSWERS = [[1, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [2, 4], [1, 4], [3, 4], [2, 3], [1, 2], [2, 4], [2, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [1, 4], [1, 3]];

    var scoreMRT = function(answers){
        mrt = 0;

        for(var i = 0; i < answers.length; i++){
            if(answers[i][0] === MRT_ANSWERS[i][0]){
                mrt++;
            }
        }

        return mrt;
    };

