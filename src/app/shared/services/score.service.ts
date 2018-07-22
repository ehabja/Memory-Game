import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Observable } from "../../../../node_modules/rxjs";
import { Game } from "../models/game";
import 'rxjs/Rx';



@Injectable({
    providedIn: 'root',
  })export class ScoreService{
    constructor(public httpClient: HttpClient){}

    public getGamesAsync(): Observable<Game[]> {

        return this.httpClient.get("http://localhost:3000/score")
        .do(games => console.log(games))
        .map((games: Object) => <Game[]>games);
    }

    public addGameAsync(game): Observable<Game>{
        return this.httpClient.post("http://localhost:3000/score",game).map((games:Game[])=>games);

    }
}