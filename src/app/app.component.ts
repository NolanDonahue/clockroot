import { Component, OnInit, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

import { addIcons } from 'ionicons';
import {
  shuffle,
  trash,
  checkmarkCircle,
  radioButtonOff,
} from 'ionicons/icons';

import { BotService } from './bot.service';
import { Difficulty } from './models/bot';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const INITIAL_SEARCH = window.location.search;
const INITIAL_HASH = window.location.hash;
const LANGUAGE_MAP: Record<string, string> = {
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  ja: 'ja-JP',
  ko: 'ko-KR',
  nl: 'nl-NL',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ru: 'ru-RU',
  zh: 'zh-CN',
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, FormsModule, TranslatePipe],
})
export class AppComponent implements OnInit {
  private translateService = inject(TranslateService);
  botService = inject(BotService);

  public language = 'en-US';
  public selectedTraitCount = 1;
  public selectedDifficulty = 'Challenging';

  constructor() {
    addIcons({
      shuffle,
      trash,
      'checkmark-circle': checkmarkCircle,
      'radio-button-off': radioButtonOff,
    });
  }

  ngOnInit() {
    this.language = localStorage.getItem('lang') ?? '';
    if (!this.language) {
      const baseLang = navigator.language || 'en-US';
      const languageCode = baseLang.split('-')[0];
      this.language = LANGUAGE_MAP[languageCode] ?? 'en-US';
    }

    this.updateTranslate();
    this.checkUrlForRandomize();
  }

  private checkUrlForRandomize() {
    const queryString = INITIAL_SEARCH || INITIAL_HASH.split('?')[1] || '';
    const params = new URLSearchParams(queryString);

    const difficulty = params.get('difficulty');
    const traits = params.get('traits');

    if (difficulty) {
      const difficultyString = ['easy', 'normal', 'challenging', 'hard'];
      if (difficulty.toLowerCase() === 'random') {
        this.difficultyRandom();
      } else if (difficultyString.includes(difficulty.toLowerCase())) {
        const formattedDifficulty = (difficulty.charAt(0).toUpperCase() +
          difficulty.slice(1).toLowerCase()) as Difficulty;
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
