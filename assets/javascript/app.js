

$(document).ready(function (){
    var catArray = ["General Knowledge", "Films", "Music","Video Games", "Geography", "Anime & Manga"];
    var urlCatArray = [9,11,12,15,22,31];
    var catChosen;
    var difChosen = "";
    var randArray = [];
    var randAnsArray = [];
    var rand;
    var question = 0;
    var rightAns = 0;
    var wrongAns = 0;
    var unanswered = 0;
    var results = [];
    var timer = 15;
    var interval;
    
    var display_cat_buttons = function() {
        $("#catBtnHolder").empty();
        for (i=0; i<catArray.length; i++){
            var catBtn = $("<button>").text(catArray[i]);
            catBtn.addClass("btn btn-success col-6 col-sm-6 col-lg-3 catBtn");
            catBtn.attr("id", i);
            $("#catBtnHolder").append(catBtn);
        }
    
    }
    display_cat_buttons();

    var restart_game = function () {
        catChosen;
        difChosen = "";
        randArray = [];
        randAnsArray = [];
        rand;
        question = 0;
        rightAns = 0;
        wrongAns = 0;
        unanswered = 0;
        results = [];
        timer = 15;
        display_cat_buttons();
        hide("#difBtnHolder",1,500);
        hide("#gameStats",1,500);
        hide("#back",1,500);
        setTimeout(function(){hide("#catBtnHolder",0,400)}, 100);
        

    }
    var ans_class_changer = function(bool) {
        if(bool){
            $("#option_0").removeClass("btn-primary");
            $("#option_0").addClass("btn-danger");
            $("#option_1").removeClass("btn-primary");
            $("#option_1").addClass("btn-danger");
            $("#option_2").removeClass("btn-primary");
            $("#option_2").addClass("btn-danger");
            $("#option_3").removeClass("btn-primary");
            $("#option_3").addClass("btn-success");
        } else {
            $("#option_0").removeClass("btn-danger");
            $("#option_0").addClass("btn-primary");
            $("#option_1").removeClass("btn-danger");
            $("#option_1").addClass("btn-primary");
            $("#option_2").removeClass("btn-danger");
            $("#option_2").addClass("btn-primary");
            $("#option_3").removeClass("btn-success");
            $("#option_3").addClass("btn-primary");
        }
       
    }

    var hide = function (cat, conditional, time) {
        if(conditional){
            $(cat).fadeOut(time);
            setTimeout(function(){$(cat).addClass("hide")},(time + 100));
        }else{
            setTimeout(function(){$(cat).removeClass("hide")},(time +100));
            $(cat).fadeIn(time+100);
        }
    }
    
    var rand_num = function(length,num,type) {
        if (type == 1){
            randArray.length = 0;
            do {
                rand = Math.floor(Math.random() * length);
                if (randArray.indexOf(rand)<0) {
                    randArray.push(rand);
                }
            }
            while(randArray.length<num);
        }else {
            randAnsArray.length = 0;
            do {
                rand = Math.floor(Math.random() * length);
                if (randAnsArray.indexOf(rand)<0) {
                    randAnsArray.push(rand);
                }
            }
            while(randAnsArray.length<num);
        }
        
        
    }
    var display_timer = function () {
        timer--;
        if (timer == 0){
            $("#timer").text("TIME'S UP!!");
            clearInterval(interval);
            $("#alertModal .modal-title").text("HA HA LOSER!!");
            $("#alertModal .modal-body").addClass("red");
            $("#alertModal .modal-body").text("Yo bro! TIME's UP!!");
            $("#alertModal").modal("show");
            setTimeout(function(){$("#alertModal").modal("hide")},1500);
            question++;
            unanswered++;
            if (question < 10){
                setTimeout(display_game, 1700);
            }else {
                end_game();
            }

            
        }else {
            if (timer<10){
                $("#timer").text(":0" + timer + " seconds left");
            }else {
                $("#timer").text(":" + timer + " seconds left");
            }
        }   
    }
    var ans_check = function (ans) {
        ans_class_changer(1);
        if (ans == 3) {
            clearInterval(interval);
            $("#alertModal .modal-title").text("HELL YEAH !! ");
            $("#alertModal .modal-body").addClass("green");
            $("#alertModal .modal-body").text("Nice choice !!");
            $("#alertModal").modal("show");
            setTimeout(function(){$("#alertModal").modal("hide")},1500);
            question++; 
            rightAns++;
            if (question < 10){
                setTimeout(display_game, 1700);
            }else {
                end_game();
            }
        }else{
            clearInterval(interval);
            $("#alertModal .modal-title").text("HA HA LOSER!!");
            $("#alertModal .modal-body").addClass("red");
            $("#alertModal .modal-body").text("Yo bro! Get your facts straight!!");
            $("#alertModal").modal("show");
            setTimeout(function(){$("#alertModal").modal("hide")},1500);
            question++;
            wrongAns++;
            if (question < 10){
                setTimeout(display_game, 1700);
            }else{
                end_game();
            }
        }
    }
    var end_game = function (){
        $("#score-var-holder").empty();
        hide("#gameHolder",1,400);
        hide("#gameStats",0,500);
        if (rightAns == 1){
            var divRight = $("<p>").text("You guessed "+ rightAns + " question correct");
        }else {
            var divRight = $("<p>").text("You guessed "+ rightAns + " questions correct");
        }
        if (wrongAns == 1){
            var divWrong = $("<p>").text("You guessed "+ wrongAns + " question wrong");
        }else {
            var divWrong = $("<p>").text("You guessed "+ wrongAns + " questions wrong");
        }
        if (unanswered == 1){
            var divUnans = $("<p>").text("You didn't guess "+ unanswered + " question");
        }else {
            var divUnans = $("<p>").text("You guessed "+ unanswered + " questions ");
        }
        $("#score-var-holder").append(divRight);
        $("#score-var-holder").append(divWrong);
        $("#score-var-holder").append(divUnans);


    }
    var display_game = function() {
        rand_num(4,4,0);
        ans_class_changer(0);
        timer = 15;
        $("#alertModal .modal-body").removeClass("green");
        $("#alertModal .modal-body").removeClass("red");
        $("#timer").empty();
        $("#question").empty();
        $("#ansBtnHolder").empty();
        $("#timer").text(":" + timer + " seconds left");
        interval = setInterval(display_timer, 1000);
        hide("#gameHolder",0,100);
        $("#question").html(results[question].question);
        for (i=0; i<4; i++){
            if (randAnsArray[i]!= 3){
                var ansBtn = $("<button>").html(results[question].incorrect_answers[randAnsArray[i]]);
                console.log(ansBtn);
                ansBtn.attr("id", ("option_" + randAnsArray[i]));
                ansBtn.addClass("btn btn-primary col-9 col-sm-9 col-lg-12 ansBtn text-center");
                $("#ansBtnHolder").append(ansBtn);
            }else{
                var ansBtn = $("<button>").html(results[question].correct_answer);
                console.log(ansBtn);
                ansBtn.attr("id", ("option_" + randAnsArray[i]));
                ansBtn.addClass("btn btn-primary col-9 col-sm-9 col-lg-12 ansBtn text-center");
                $("#ansBtnHolder").append(ansBtn);
            }
                
        }
        

    }
    var start_game = function() {
        var urlCat = urlCatArray[catChosen];
        var reqUrl = "https://opentdb.com/api.php?amount=25&category="+ urlCat +"&difficulty="+ difChosen+ "&type=multiple";
        $.ajax({
            url: reqUrl,
            method: "Get"
        }).then(function (response){
            results = response.results;
            console.log(results);
            rand_num(results.length,10,1);
            
            console.log(randAnsArray);
            hide("#difBtnHolder",1, 100);
            display_game();
        })
    }


    $("#catBtnHolder").on("click", ".catBtn", function(){
        catChosen = this.id;
        $("#header-2").text(catArray[catChosen]);
        hide("#catBtnHolder",1,500);
        hide("#difBtnHolder",0,500);
        hide("#back",0,500);
        
    })
    $("#difBtnHolder").on("click", ".difBtn", function(){
        difChosen= this.id;
        console.log(difChosen);
        hide("#header-2",1,100);
        hide("#back",1,100);
        start_game();
    })

    $("#ansBtnHolder").on("click", ".ansBtn", function () {
        console.log(this);
        var id = this.id;
        var splitId = id.split("_");
        var ans = splitId[1];
        ans_check(ans)
    })
    $("#play-again").on("click", restart_game);
    $("#back").on("click", restart_game);
});