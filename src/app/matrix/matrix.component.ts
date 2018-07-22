import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/models/game';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ScoreService } from '../shared/services/score.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

    public matrix: String[][];
    public players: String[];
    public pics: String[][];
    public flip: boolean;
    public steps: number;
    public clicks: number;
    public beforeX: number;
    public beforeY: number;
    public afterX: number;
    public afterY: number;
    public finishPics: number;
    public game: Game;
    private subscription: Subscription;
    public state: Number;

    public nameControl: FormControl;
    public nameForm: FormGroup;
    public insert: Number;
    public error: Number;



    constructor(private scoreService: ScoreService) { }

    ngOnInit() {

        this.nameControl = new FormControl("", Validators.required);
        this.nameForm = new FormGroup({
            nameControl: this.nameControl
        });

        this.insert=0;
        this.error=0;
        this.state = 0;
        this.flip = false;
        this.steps = 0;
        this.clicks = 0;
        this.beforeX = 0;
        this.beforeY = 0;
        this.afterX = 0;
        this.afterY = 0;
        this.finishPics = 0;
        this.game = new Game("name",new Date(),new Date(),0,0);
        this.players = ['ronaldo', 'mbappe', 'neymar', 'messi', 'godin', 'cheryshev', 'courtois', 'modric'];
        this.matrix = [['empty','empty','empty','empty'],['empty','empty','empty','empty'],['empty','empty','empty','empty'],['empty','empty','empty','empty']];
        this.pics = new Array(4);
        this.pics[0] = new Array(4);
        this.pics[1] = new Array(4);
        this.pics[2] = new Array(4);
        this.pics[3] = new Array(4);
        var check = new Array();
        var count;

        for(let i=0 ; i<this.pics.length ; i++){
            for(let j=0 ; j<this.pics[i].length ; j++){
                this.pics[i][j] = this.players[Math.floor(Math.random()*this.players.length)];
                check.push(this.pics[i][j]);
                count = 0;
                for(var k = 0; k < check.length; k++){
                    if(check[k] == this.pics[i][j])
                        count++;

                }
                if(count > 1){
                    var index = this.players.indexOf(this.pics[i][j]);
                    this.players.splice(index, 1)
                }
            }
        }
    }

    public playAgain(): void{
        this.ngOnInit();
    }


    playerClicked(x,y): void{

        if(this.nameControl.value == ""){
            this.error=1;
        }else{
            this.game.name = this.nameControl.value;
            this.insert = 1;
            this.error=0;
            if(this.matrix[x][y] == "empty" && this.flip == false){
                this.steps++;
                if(this.steps == 1){
                    this.game.startTime = new Date();
                    alert("new GAME");
                }
                if(this.clicks == 1){
                    this.afterX = x;
                    this.afterY = y;
                    this.matrix[x][y] = this.pics[x][y];
                    this.flip = true;
                    setTimeout(() => {
                        if (this.pics[this.afterX][this.afterY] == this.pics[this.beforeX][this.beforeY]) {
    
                            this.matrix[this.beforeX][this.beforeY] = "done";
                            this.matrix[this.afterX][this.afterY] = "done";
                            this.finishPics++;
                            if(this.finishPics == 8){
                                this.game.endTime = new Date();
                                this.game.steps = this.steps;
                                this.subscription = this.scoreService.addGameAsync(this.game).subscribe(game => this.game = game);
                                this.state = 1;
                            }
                        }else{
                            this.matrix[this.beforeX][this.beforeY] = "empty";
                            this.matrix[this.afterX][this.afterY] = "empty";
                        }
                        this.clicks = 0;
                        this.flip = false;
                    }, 1000);
                }
                if(this.clicks == 0){
                    this.beforeX = x;
                    this.beforeY = y;
                    this.matrix[x][y] = this.pics[x][y];
                }
                this.clicks++;
            }   
        }
    } 

}
