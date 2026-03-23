import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BotService } from './bot.service';
import { Difficulty } from './models/bot';

const INITIAL_SEARCH = window.location.search;
const INITIAL_HASH = window.location.hash;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public language: string;
  public selectedTraitCount: number = 1;
  public selectedDifficulty: string = "Challenging";

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    public botService: BotService
  ) {
  }

  ngOnInit() {
    this.language = localStorage.getItem('lang');
    if (!this.language) {
      const baseLang = navigator.language || "en-US";
      baseLang.split("-")[0] === "fr"
        ? (this.language = "fr-FR")
        : baseLang.split("-")[0] === "es"
        ? (this.language = "es-ES")
        : baseLang.split("-")[0] === "de"
        ? (this.language = "de-DE")
        : baseLang.split("-")[0] === "ja"
        ? (this.language = "ja-JP")
        : baseLang.split("-")[0] === "ko"
        ? (this.language = "ko-KR")
        : baseLang.split("-")[0] === "nl"
        ? (this.language = "nl-NL")
        : baseLang.split("-")[0] === "pl"
        ? (this.language = "pl-PL")
        : baseLang.split("-")[0] === "pt"
        ? (this.language = "pt-BR")
        : baseLang.split("-")[0] === "ru"
        ? (this.language = "ru-RU")
        : baseLang.split("-")[0] === "zh"
        ? (this.language = "zh-CN")
        : (this.language = "en-US");
    }

    this.updateTranslate();
    this.checkUrlForRandomize();
  }

private checkUrlForRandomize() {
    const queryString = INITIAL_SEARCH || INITIAL_HASH.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    
    const difficulty = params.get('difficulty');
    const traits = params.get('traits');;

    if (difficulty) {
      const difficultyString = ["easy","normal","challenging","hard"]
      if (difficulty.toLowerCase() === 'random') {
        this.difficultyRandom();
      } 
      else if (difficultyString.includes(difficulty.toLowerCase())) {
        const formattedDifficulty = (difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()) as Difficulty;
        this.changeAllDifficulties(formattedDifficulty); 
      }
    }
    if (traits) {
      const parsedTraits = parseInt(traits, 10);
      if (!isNaN(parsedTraits)) {
        this.selectedTraitCount = parsedTraits;
        this.setTrait(parsedTraits);
      }
    }
  }
    public languageChange() {
      localStorage.setItem('lang', this.language);
      this.updateTranslate();
    }
    
    private updateTranslate() {
      this.translateService.use(this.language);
    }
    
    public changeAllDifficulties(difficulty: Difficulty) {
      this.selectedDifficulty = difficulty;
      this.botService.changeAllDifficulties(difficulty);
    }
    
    public difficultyRandom() {
      this.botService.difficultyRandom();
    } 
    
    public setTrait(num: number) {
      this.botService.setTrait(num);
    }
}
