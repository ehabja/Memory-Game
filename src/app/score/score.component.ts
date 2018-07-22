import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../shared/models/game';
import { ScoreService } from '../shared/services/score.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

    public game: Game[];
    private subscription: Subscription;


    constructor(private scoreService: ScoreService) { }  

    ngOnInit() {
        this.subscription = this.scoreService.getGamesAsync()
                                .subscribe(game => this.game = game);
    }


}
