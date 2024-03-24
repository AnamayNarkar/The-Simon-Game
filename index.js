$(document).ready(function () {
    adjustFontSize();
});

$(window).resize(function () {
    adjustFontSize(); 
});

let arr=["green","red","blue","yellow"];
let SetSequence = [];
let UserSequence = [];
let highest = parseInt(localStorage.getItem('highest')) || 0;
$(".highest").text("Highest : " + highest);

$(".start-button").click(async function(){
    $(".start-button").addClass("hidden");
    SetSequence = [];
    UserSequence = [];
    await delay(600);
    start();
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pressed(num) {
    $("." + arr[num]).fadeIn(100).fadeOut(100).fadeIn(100);
}


function adjustFontSize() {
    var middlePanelWidth = $(".middle-panel").width();
    var fontSize = middlePanelWidth * 0.18;
    $(".start-text").css("font-size", fontSize + "px");
    $(".round-number").css("font-size", fontSize + "px");
}


async function displayRoundNumber(round) {
    return new Promise(async resolve => { 
        $(".round-number").text("Round "+round);
        $(".round-number").removeClass("hidden");
        await delay(1000);
        $(".round-number").addClass("hidden");
        resolve();
    });
}

function updateHighScore(currentScore) {
    if (currentScore > highest) {
        highest = currentScore;
        localStorage.setItem('highest', highest);
    }
}

function getUserAnswer() {
    return new Promise(resolve => {
        $(".colors").on('click', function(){
            if ($(this).hasClass("green")) 
            {
                UserSequence.push("green");
                pressed(0);
                $(".colors").off('click');
                resolve();
            } 
            else if ($(this).hasClass("red")) 
            {
                UserSequence.push("red");
                pressed(1);
                $(".colors").off('click');
                resolve();
            } 
            else if ($(this).hasClass("blue")) 
            {
                UserSequence.push("blue");
                pressed(2);
                $(".colors").off('click');
                resolve();
            } 
            else if ($(this).hasClass("yellow")) 
            {
                UserSequence.push("yellow");
                pressed(3);
                $(".colors").off('click');
                resolve();
            }
        });
    });
}


async function start() 
{
    let round=1;
    let score=0;
    $("UserScore").text("Score : "+score);
    let end=false;
    while(true)
    { 
        await displayRoundNumber(round);
        await delay(350);
        SetSequence = [];
        UserSequence = [];
        for(let i=0;i<round;i++)
        {
            var randomNumber = Math.floor(Math.random() * 4);
            SetSequence.push(arr[randomNumber]);
            $("." + arr[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
            await delay(350);
        }

        let indexCheck=0;

        for(let i=0;i<round;i++)
        {
            await getUserAnswer();
            if(SetSequence[indexCheck]===UserSequence[indexCheck]){
                indexCheck++;
                continue;
            }
            else
            {
                end=true;
                break;
            }
        }

        if(end===false)
        {
            round++;
            score++;
            $(".UserScore").text("Score : "+score);
            updateHighScore(score);
            $(".highest").text("Highest : " + highest);
        }else
        {
            break;
        }

        await delay(500);
    }
    tryagain();
}

async function tryagain() 
{
    $(".middle-panel").addClass("tryagain");
    await delay(1000);
    $(".tryagainbutton").removeClass("hidden");
    
    $(".tryagainbutton").on('click',function() {
        $(this).off('click');
        $(".middle-panel").removeClass("tryagain");
        $(".tryagainbutton").addClass("hidden");
        location.reload();
    });
}
