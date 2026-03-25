import { Component, OnInit, Input, inject } from '@angular/core';
import { EyrieBot } from '../models/eyrie';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../paragraph/paragraph.component';

@Component({
  selector: 'app-eyrie',
  templateUrl: './eyrie.component.html',
  styleUrls: ['./eyrie.component.scss'],
  standalone: false,
})
export class EyrieComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot: EyrieBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  ngOnInit() {
    this.bot.customData.buildings = this.bot.customData.buildings || [];
    this.refreshTurnMessages();
  }

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
  }

  toggleSetup() {
    this.botService.toggleSetup(this.bot);
    this.refreshTurnMessages();
  }

  changeDifficulty(difficulty: string) {
    this.botService.changeDifficulty(this.bot, difficulty);
    this.refreshTurnMessages();
  }

  modifySuitCard(suit, diff = 1) {
    this.bot.customData.decree[suit] = Math.max(
      this.bot.customData.decree[suit] + diff,
      0,
    );

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleBuilding(index) {
    this.bot.customData.buildings[index] =
      !this.bot.customData.buildings[index];

    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
