
if (window.innerWidth <= 800){
    document.getElementById("easy").style.width = "50%";
    document.getElementById("easy").style.fontSize = "20%";
    document.getElementById("hard").style.width = "69%";
    document.getElementById("hard").style.fontSize = "20%";
    document.getElementById("mode").style.left = "32%";
    document.getElementById("submit_score").style.width = "35%";
   
    
}


var FrameWidth = window.innerWidth
var width = FrameWidth*0.75

        const C_HEIGHT = 500;
        const C_WIDTH = width;
        const S_START_Y = 500 / 2;
        const S_START_X = C_WIDTH / 3;
        const S_WIDTH = 50;
        const S_HEIGHT = 50;
        const PIPE_WIDTH = 100;
        const ALL_PIPES = []
        const CLOSE_PIPES =[]
        score = 0;
        dead = 'false'

        document.getElementById('scoreboard_hard').style.display = 'none'//=====

        function sprite_init() {
            var death_msg = document.getElementById('deathMsg')
            death_msg.style.display= 'none'
            var replay = document.getElementById('replay')
            replay.style.display = 'none'
            var death_popup = document.getElementById('death_popup')
            death_popup.style.display = 'none'

            let sprite = document.getElementById("sprite");
            sprite.style.top = S_START_Y + "px";
            sprite.style.left = S_START_X + "px";

            
            let grass = document.createElement('div')
            grass.className = "pipe_piece"
            grass.style.position = 'absolute'
            grass.style.height = "10px"
            grass.style.width = '100%';
            grass.style.bottom = '0px'
            grass.style.left = '0px'
            grass.style.background = "#68507B"
            container.appendChild(grass)
            

            let roof = document.createElement('div')
            roof.className = "pipe_piece"
            roof.style.position = 'absolute'
            roof.style.width = '100%';
            roof.style.height = "10px"
            roof.style.background = "#68507B"
            container.appendChild(roof)
            roof.style.top = '0px';

        }

        function gravity_init(mod) {
            let sprite = document.getElementById("sprite");
            let pos_y = S_START_Y;
            let interval = setInterval(function () {
                if (pos_y < C_HEIGHT - S_HEIGHT - 10 && pos_y > 10) {
                    pos_y = parseInt(sprite.style.top) + mod;
                    sprite.style.top = pos_y + "px";
                }else{
                    clearInterval(interval)
                    dead = "true"
                    return;
                }
            }, 100)
        }

        function fly_jump_init(mod){
            let sprite = document.getElementById("sprite");
            
            document.addEventListener("keydown",function(e){
                if(e.which == 32){
                    sprite.style.top = parseInt(sprite.style.top) - mod + "px";
                }
            })

            document.addEventListener("touchstart",function(){
                sprite.style.top = parseInt(sprite.style.top) - mod + "px";
            })
        }

        function pipes_init(){
            let pipe_btm = document.createElement('div')
            let pipe_top = document.createElement('div')
            pipe_btm.className = 'pipe_piece'
            pipe_top.className = 'pipe_piece'
            pipe_btm.style.position = 'absolute'
            pipe_top.style.position = 'absolute'
            pipe_top.style.background = "#68507B";
            pipe_btm.style.background = "#68507B";
            pipe_top.style.left= C_WIDTH + "px"
            pipe_btm.style.left = C_WIDTH + "px"
            pipe_top.style.width= PIPE_WIDTH + "px"
            pipe_btm.style.width = PIPE_WIDTH + "px"
            let container = document.getElementById('container')
            container.appendChild(pipe_btm)
            container.appendChild(pipe_top)
            let gap = 4*S_HEIGHT;


            

            let gap_pos = Math.floor(Math.random()*(C_HEIGHT-gap))
            let pipe_btm_pos_top = C_HEIGHT - gap_pos;
            let pipe_btm_height = C_HEIGHT - pipe_btm_pos_top;
            let pipe_top_pos_btm = gap_pos + gap;

            pipe_btm.style.height= gap_pos + 'px';
            pipe_btm.style.top= C_HEIGHT - gap_pos + 'px';


            pipe_top.style.height = (C_HEIGHT - gap_pos) - gap + "px"
            return [pipe_btm, pipe_top]
        }


        function pipes_road(speed){

            let pipes = pipes_init()

            ALL_PIPES.push(pipes)
    
           let pipe_btm = pipes[0]
           let pipe_top = pipes[1]

            let interval = setInterval(function(){
                pipe_btm.style.left = parseInt(pipe_btm.style.left)-1 +'px';
                pipe_top.style.left = parseInt(pipe_top.style.left)-1 + 'px';
                if (parseInt(pipe_top.style.left) == -100){
                    clearInterval(interval)
                    ALL_PIPES.shift()
                    pipe_btm.remove()
                    pipe_top.remove()
                }
            },speed)
        }

        function is_death(){
            let sprite_left = S_START_X
            let sprite = document.getElementById("sprite");

            let interval = setInterval(function(){
                let sprite = document.getElementById("sprite");
            
                for (let i =0; i<ALL_PIPES.length; i++){
                    danger = 'false'
    
                    if(parseInt(ALL_PIPES[i][0].style.left) < S_START_X + S_WIDTH && parseInt(ALL_PIPES[i][0].style.left) + PIPE_WIDTH > S_START_X){
                      danger = 'true'  
                    }

                    if (danger=="true"){

                       if(parseInt(sprite.style.top) <= parseInt(ALL_PIPES[i][1].style.height) || parseInt(sprite.style.top) +S_HEIGHT >= parseInt(ALL_PIPES[i][1].style.height) + (4*S_HEIGHT)){ 
                           dead = "true"
                           sprite.style.display = 'none'
                       }
                    }
                }
            },10)
        }


function scoreCount(){
    let interval = setInterval(function(){
                        scoreBord = document.getElementById('score')
                        score = score+1
                        scoreBord.innerHTML = ("Score: " + score)
                  
                if (dead=="true"){
                    clearInterval(interval)
                    var death_msg = document.getElementById('deathMsg')
                    var replay = document.getElementById('replay')
                    var death_popup = document.getElementById('death_popup')
                    death_popup.style.display = 'block'
                    death_msg.style.display= 'block'
                    replay.style.display ='block'   
                }

                },400)                
}





sprite_init();

document.getElementById('start').addEventListener('click',function(){

    document.getElementById('start').style.display = 'none'
    document.getElementById('mode_easy').disabled = true
    document.getElementById('mode_hard').disabled = true

    if (document.getElementById('mode_easy').checked){
        gravity_init(10);
        fly_jump_init(30);
        scoreCount();
        pipes_road(10)
        is_death()

        let interval = setInterval(function(){
        pipes_road(10)
        },3000)

    }else if(document.getElementById('mode_hard').checked){
        gravity_init(20);
        fly_jump_init(50);
        pipes_road(2)
        scoreCount();
        is_death()

        let interval = setInterval(function(){
        pipes_road(2)
        },1500)

    }


    })


document.getElementById('replay').addEventListener('click',function(){
window.location.reload()
    })




document.getElementById('submit_score').addEventListener('click',function(){

let name = document.getElementById('username').value;
let scoreNum = score




if (document.getElementById('mode_easy').checked){
    database.ref("/easy").push({
        data: {
            username: name,
            score: scoreNum,
        }
    })
   
    
}else if(document.getElementById('mode_hard').checked){
    database.ref("/hard").push({
        data: {
            username: name,
            score: scoreNum,
        }
    })
}
console.log(name + " got a score of "+ scoreNum)

alert('Your score of '+ score+" has been added to the scorebord! press Play Again to refresh")
})


function scoreboard(){

    var scores_easy = []
    var names_easy = []
    var scores_hard = []
    var names_hard = []

let interval = setInterval(function(){
    if(document.getElementById('hard').checked){
       document.getElementById('scoreboard_hard').style.display = "block"
       document.getElementById('scoreboard_easy').style.display = "none"
    }else if(document.getElementById('easy').checked){
       document.getElementById('scoreboard_easy').style.display = "block"
       document.getElementById('scoreboard_hard').style.display = "none"
    }



    if (score==10){
        document.getElementById('sprite').style.background='pink'
        document.getElementsByClassName('pipe_piece').style.color ='#03045e'
    }

},200);

//=====EASY=======
    database.ref("/easy").once('value',function(snapshot){
        var obj = snapshot.val()
        var keysArr = (Object.keys(obj))
        var length = keysArr.length

        for (i=0; i<length; i++) {
            object = (obj[keysArr[i]])
            raw = (object.data)
            scores_easy.push(raw.score)
        }
        for (i=0; i<length; i++) {
            object = (obj[keysArr[i]])
            raw = (object.data)
            names_easy.push(raw.username)
        }


    var len = scores_easy.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(scores_easy[j-1]<scores_easy[j]){
           var temp = scores_easy[j-1];
           var temp2 = names_easy[j-1]
           scores_easy[j-1] = scores_easy[j];
           names_easy[j-1] = names_easy[j];
           scores_easy[j] = temp;
           names_easy[j] = temp2;
        }
     }
   }

   for (i=0; i<10; i++){
    var name_score = document.createElement('h5')
    var txtNode = document.createTextNode((i+1)+ '. '+ names_easy[i]+' - Score: ' + scores_easy[i])
    name_score.appendChild(txtNode)
    document.getElementById('scoreboard_easy').appendChild(name_score)

    if (i==0){
        name_score.style.color = '#28193D'
        name_score.style.fontSize = '20px'
    }
   }


   var top_100_easy = document.createElement('select')
   document.getElementById('scoreboard_easy').appendChild(top_100_easy)

   var show_more = document.createElement('option')
   var show_text = document.createTextNode('Show More')
   show_more.appendChild(show_text)
   top_100_easy.appendChild(show_more)

   for (i=10; i<100; i++){

    var name_score = document.createElement('option')
    var txtNode = document.createTextNode((i+1)+ '. '+ names_easy[i]+' - Score: ' + scores_easy[i])
    name_score.appendChild(txtNode)
    top_100_easy.appendChild(name_score)

    
   }

       //=== ====== easy=====
})


//=============HARD============
database.ref("/hard").once('value',function(snapshot){
        var obj = snapshot.val()
        var keysArr = (Object.keys(obj))
        var length = keysArr.length

        for (i=0; i<length; i++) {
            object = (obj[keysArr[i]])
            raw = (object.data)
            scores_hard.push(raw.score)
        }
        for (i=0; i<length; i++) {
            object = (obj[keysArr[i]])
            raw = (object.data)
            names_hard.push(raw.username)
        }


    var len = scores_hard.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(scores_hard[j-1]<scores_hard[j]){
           var temp = scores_hard[j-1];
           var temp2 = names_hard[j-1]
           scores_hard[j-1] = scores_hard[j];
           names_hard[j-1] = names_hard[j];
           scores_hard[j] = temp;
           names_hard[j] = temp2;
        }
     }
   }

   for (i=0; i<10; i++){
    var name_score = document.createElement('h5')
    var txtNode = document.createTextNode((i+1)+ '. '+ names_hard[i]+' - Score: ' + scores_hard[i])
    name_score.appendChild(txtNode)
    document.getElementById('scoreboard_hard').appendChild(name_score)

    if (i==0){
        name_score.style.color = '#28193D'
        name_score.style.fontSize = '20px'
    }
    
   }


   var top_100_hard = document.createElement('select')
   document.getElementById('scoreboard_hard').appendChild(top_100_hard)

   var show_more = document.createElement('option')
   var show_text = document.createTextNode('Show More')
   show_more.appendChild(show_text)
   top_100_hard.appendChild(show_more)

   for (i=10; i<100; i++){

    var name_score = document.createElement('option')
    var txtNode = document.createTextNode((i+1)+ '. '+ names_hard[i]+' - Score: ' + scores_hard[i])
    name_score.appendChild(txtNode)
    top_100_hard.appendChild(name_score)
   }
    

    })

}

      scoreboard()  
