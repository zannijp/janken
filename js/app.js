// window.addEventListener("load", function(){
//     document.body.addEventListener("keyup", event => {
//         if (event.key === " ") {
//             // console.log("ゲーム開始");
//             janken();
//         }
//     })
// })

// function janken() {
//     document.body.addEventListener("keyup", keyUpEvent)
// }
// function keyUpEvent(e) {
//     if (e.key === "q") {
//         // p_janken = "グー"
//         console.log(p_janken);
//     } else if (e.key === "w") {
//         // p_janken = "チョキ"
//         console.log(p_janken);
//     } else if (e.key === "e") {
//         // p_janken = "パー"
//         console.log(p_janken);
//     }
//     clearEvent();
// }

// function clearEvent() {
//     if (result === "win" || result === "lose") {
//         document.body.removeEventListener("keyup", keyUpEvent);
//         // console.log("クリア");
//     }
// }

$("body").on("keyup", function(e) { 
    if(e.key === "q") {
        $("#guu").trigger("click");
        $("#jankenShuffle").removeAttr('name');
        $("#jankenShuffle").addClass("d_none");
        $("#jankenPlayer").addClass("d_block");
        $("#jankenShuffle").removeClass("d_block");
    } else if(e.key === "w") {
        $("#choki").trigger("click");
        $("#jankenShuffle").removeAttr('name');
        $("#jankenShuffle").addClass("d_none");
        $("#jankenPlayer").addClass("d_block");
        $("#jankenShuffle").removeClass("d_block");
    } else if(e.key === "e") {
        $("#par").trigger("click");
        $("#jankenShuffle").removeAttr('name');
        $("#jankenShuffle").addClass("d_none");
        $("#jankenPlayer").addClass("d_block");
        $("#jankenShuffle").removeClass("d_block");
    }
})

function Click(p_janken_r) {
    janken = ["グー", "チョキ", "パー",];//"janken"のリストを作成
    let janken_r = Math.floor( Math.random() * 3);//Math.random() で乱数

    //勝ち負けの判定機プログラム
    if (janken_r === p_janken_r) {
        result = "even";
        janken_result(result)
    } else if(p_janken_r === 0 && janken_r === 1 || p_janken_r === 1 && janken_r === 2 || p_janken_r === 2 && janken_r === 0) {
        result = "win";
        janken_result(result)
        $("#guu").removeAttr("onclick");
        $("#choki").removeAttr("onclick");
        $("#par").removeAttr("onclick");
    }else {
        result = "lose";
        janken_result(result)
        $("#guu").removeAttr("onclick");
        $("#choki").removeAttr("onclick");
        $("#par").removeAttr("onclick");
    }

    function janken_result(result) {
        if (result === "even") {
            Result_end = "jankenEven";
            PlaySound(result);
        } else if (result === "win") {
            Result_end = "jankenWin";
            PlaySound(result);
        } else if (result === "lose") {
            Result_end = "jankenLose";
            PlaySound(result);
        }
    }

    function PlaySound(result) {
          audioElem = new Audio();
        if (result === "even") {
            a++;
            console.log(a);
            if( a < 2 ) {
                audioElem.src = "audio/aikode.mp3";
            } else {
                audioElem.src = "audio/aikodeSho.mp3";
            }
        } else if (result === "win") {
            // audioElem.src = "audio/win.mp3";
            if( a < 1 ) {
                audioElem.src = "audio/win.mp3";
                console.log(a);
            } else {
                audioElem.src = "audio/winSho.mp3";
                console.log(a);
            }
        } else if (result === "lose") {
            // audioElem.src = "audio/lose.mp3";
            if( a < 1 ) {
                audioElem.src = "audio/lose.mp3";
                console.log(a);
            } else {
                audioElem.src = "audio/loseSho.mp3";
                console.log(a);
            }
        }
        audioElem.play();
    }

        //結果を表示するためのプログラムです
        $("#jankenMain").attr("src", "svg/playerGcp" + p_janken_r + ".svg"); //画像切り替え
        $("#jankenResult").attr("src", "svg/" + Result_end + ".svg");
        $("#jankenPlayer").attr("src", "svg/player" + janken_r + ".svg");
        
        return result;
}

function PlaySound() {
    audioElem = new Audio();
    audioElem.src = "audio/janken.mp3";
    audioElem.play();
}
document.body.addEventListener("keydown", event => {
    audioElem.pause();
});

function imgTimer() {
    //画像番号
    count++; //*3
    //画像の枚数確認
    if (count == shuffleImg.length) count = 0; //*4
    //画像出力
    document.shuffle.src = shuffleImg[count]; //*5
    //次のタイマー呼びだし
    setTimeout("imgTimer()",50); //*6
}

document.body.addEventListener("keyup", event => {
    if (event.key === " ") {
        a = 0;
        
        PlaySound();
        $("#jankenPlayer").removeClass("d_block");
        $("#jankenPlayer").addClass("d_none");
        $("#jankenShuffle").addClass("d_block");
        // 画像シャッフル
        $("#jankenShuffle").attr("name", "shuffle");
        shuffleImg = Array("svg/player0.svg","svg/player1.svg","svg/player2.svg"); //*1
        count = -1; //*2
        imgTimer();
    // } else if (event.key != " ") {
    //     audioElem.pause();
        if (a < 2) {
            $("#guu").attr("onclick", "Click(0)");
            $("#choki").attr("onclick", "Click(1)");
            $("#par").attr("onclick", "Click(2)");
        }
    }
});