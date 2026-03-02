import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BotService } from './bot.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public language: string;

  constructor(
    private translateService: TranslateService,
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
  }

  public languageChange() {
    localStorage.setItem('lang', this.language);

    this.updateTranslate();
  }

  private updateTranslate() {
    this.translateService.use(this.language);
  }
}
