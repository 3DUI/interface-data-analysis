/**
 * Created by siobhan on 15/10/08.
 */

    MRT_ANSWERS = [[1, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [2, 4], [1, 4], [3, 4], [2, 3], [1, 2], [2, 4], [2, 3], [1, 4], [2, 4], [2, 3], [1, 3], [1, 4], [2, 4], [2, 3], [1, 4], [1, 3]];

    var printData = function(participants){

        var table = $("#results");

        for(var i = 0; i < participants.length; i++){

            var row =  $("<tr></tr>");
            var num = $("<td></td>").text(participants[i].num);
            var mrt = $("<td></td>").text(participants[i].mrt);
            var shadSUS = $("<td></td>").text(participants[i].shadowSUS);
            var stadSUS = $("<td></td>").text(participants[i].standardSUS);

            num.appendTo(row);
            mrt.appendTo(row);
            shadSUS.appendTo(row);
            stadSUS.appendTo(row);

            var time = $("<td></td>").text(participants[i].shadowTasks[participants[i].shadowTasks.length-1].time);

            time.appendTo(row);
            row.appendTo(table);
        }
    };

