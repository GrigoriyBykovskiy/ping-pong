var model={
    ball:{
        x: 250,
        y: 250,
        Vx: 1,
        Vy: 5,
        radius: 10,
        elasticity: 1.05
    },
    player_1:{
        x:200,
        y:480,
        widht:100,
        height:10,
        score: 0
    },
    player_2:{
        x:200,
        y:10,
        widht: 100,
        height: 10,
        score: 0
    },
    game_field:{
        x:0,
        y:0,
        widht:500,
        height:500,
    },
    game_status: 0,
    reset:function(){
        this.ball.x=250;
        this.ball.y=250;
        this.game_status=0;
        this.player_1.x=200;
        this.player_1.y=480;
        this.player_2.x=200;
        this.player_2.y=10;
    },
    random_ball_speed:function(){
        var numPool = [ -9, -8,-7,-6,-5,-4,-3,-2,2,3,4,5,6, 7, 9];
        return rand = numPool[Math.floor(Math.random() * numPool.length)];
    },
    update:function(){
        //physics of game
        if(this.ball.x-this.ball.radius<0){
            this.ball.Vx =-this.ball.Vx*this.ball.elasticity;
            this.ball.Vy =this.ball.Vy*this.ball.elasticity;
        }
        if(this.ball.x+this.ball.radius>this.game_field.widht){
            this.ball.Vx =-this.ball.Vx*this.ball.elasticity;
            this.ball.Vy =this.ball.Vy*this.ball.elasticity;
        }
        if(this.ball.y<0){
            this.reset();
            this.ball.Vx=this.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            this.ball.Vy=this.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            this.player_1.score++;
        }
        if(this.ball.y+this.ball.radius>this.game_field.height){
            this.reset();
            this.ball.Vx=this.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            this.ball.Vy=this.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            this.player_2.score++;
        }
        if(this.player_1.x + this.player_1.widht>= this.game_field.widht) this.player_1.x = this.game_field.widht-this.player_1.widht;
        if(this.player_2.x + this.player_2.widht>= this.game_field.widht) this.player_2.x = this.game_field.widht-this.player_2.widht;
        if(this.player_1.x<0) this.player_1.x=0;
        if(this.player_2.x<0) this.player_2.x=0;
        if((this.ball.y>470)&&(this.ball.x>this.player_1.x)&&(this.ball.x<this.player_1.x+this.player_1.widht)){
            this.ball.Vy =-this.ball.Vy*this.ball.elasticity;
            this.ball.Vx =this.ball.Vx*this.ball.elasticity;
        }
        if((this.ball.y<30)&&(this.ball.x>this.player_2.x)&&(this.ball.x<this.player_2.x+this.player_2.widht)){
            this.ball.Vy =-this.ball.Vy*this.ball.elasticity;
            this.ball.Vx =this.ball.Vx*this.ball.elasticity;
        }
        if (this.game_status!==0) {
            this.ball.x += this.ball.Vx;
            this.ball.y += this.ball.Vy;
        }
        //ai for player_2
        var x;
        var k;
        switch (this.player_1.score) {
            case 3:
                k=0.8;
                break;
            case 6:
                k=0.85;
                break;
            case 9:
                k=0.9;
                break;
            default:
                k=0.7
        }
        var Vx = Math.abs(this.ball.Vx)*k;
        if (this.ball.x < this.player_2.x + this.player_2.widht/2) {
            x = this.player_2.x - Vx;
        }
        if (this.ball.x > this.player_2.x + this.player_2.widht/2) {
            x = this.player_2.x + Vx;
        }
        if (this.game_status!==0) this.player_2.x = x;
    }
};
function player_move(event) {
    var x = event.pageX;
    var left_position=x - model.player_1.widht/2;
    var right_position=x + model.player_1.widht/2;
    if(left_position<0||right_position>model.game_field.widht){
        if (left_position<0) model.player_1.x=0;
        if (right_position>model.game_field.widht) model.player_1.x=model.game_field.widht-model.player_1.widht;
    }
    else{
        model.player_1.x=left_position;
    }
};
function on_click(event){
    model.game_status=1;
};
function check_winner(){
    if (model.player_1.score===10||model.player_2.score===10){
        if (model.player_1.score===10) alert ("Player 1 win!");
        if (model.player_2.score===10) alert ("Player 2 win!");
        model.reset();
        model.ball.Vx=model.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        model.ball.Vy=model.random_ball_speed();//Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        model.player_1.score=0;
        model.player_2.score=0;
    }
};
function view(ball,player_1,player_2,game_field) {
    var canvas = document.getElementById("pong");
    canvas.width = game_field.widht;
    canvas.height = game_field.height;
    context = canvas.getContext("2d");
    //function draw_game_field()
    context.fillStyle = "black";
    context.fillRect(game_field.x, game_field.y, game_field.widht, game_field.height);
    //function draw_player_1()
    context.fillStyle = "white";
    context.fillRect(player_1.x, player_1.y, player_1.widht, player_1.height);
    //function draw_player_2()
    context.fillStyle = "white";
    context.fillRect(player_2.x, player_2.y, player_2.widht, player_2.height);
    //function draw_ball(){
    if (model.game_status ===0) {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke();
    }
    //function draw_ball_trace()
    if (model.game_status !==0) {
        context.beginPath();
        context.arc(ball.x - 1.5*ball.Vx, ball.y - 1.5*ball.Vy, ball.radius*0.65, 0, 2 * Math.PI);
        context.fillStyle = "rgba(255,0,0,0.75)";
        context.fill();
        context.beginPath();
        context.arc(ball.x - 2*ball.Vx, ball.y - 2*ball.Vy, ball.radius*0.55, 0, 2 * Math.PI);
        context.fillStyle = "rgba(255,0,0,0.5)";
        context.fill();
        context.beginPath();
        context.arc(ball.x - 2.5*ball.Vx, ball.y - 2.5*ball.Vy, ball.radius*0.45, 0, 2 * Math.PI);
        context.fillStyle = "rgba(255,0,0,0.25)";
        context.fill();
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke();
    }
    //function draw_score()
    var players_score = player_1.score + ' : ' + player_2.score;
    context.fillStyle = "white";
    context.font="50px Arial";
    context.fillText(players_score,0.4*model.game_field.widht,0.4*model.game_field.height);
};
function controller(){
    check_winner();
    view(model.ball,model.player_1,model.player_2,model.game_field,model.game_status);
    var canvas = document.getElementById("pong");
    canvas.addEventListener('click', on_click);
    if (model.game_status !==0) {
        canvas.onmousemove = player_move;
        canvas.removeEventListener('click', on_click);
        model.update();
    }
    setTimeout(controller, 1000/30);
};
function init(){
    controller();
}
