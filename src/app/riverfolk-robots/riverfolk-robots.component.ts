import { Component, OnInit, Input, inject } from '@angular/core';
import { RiverfolkBot } from '../models/riverfolk';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../paragraph/paragraph.component';

@Component({
  selector: 'app-riverfolk',
  templateUrl: './riverfolk-robots.component.html',
  styleUrls: ['./riverfolk-robots.component.scss'],
  standalone: false,
})
export class RiverfolkComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot: RiverfolkBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  public buildings = [
    { suit: 'fox', building: 'tradingpost' },
    { suit: 'bunny', building: 'tradingpost' },
    { suit: 'mouse', building: 'tradingpost' },
  ];

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

  changeSuit(suit: string) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  ngOnInit() {
    ['fox', 'bunny', 'mouse'].forEach((suit) => {
      this.bot.customData.buildings[suit] =
        this.bot.customData.buildings[suit] || [];
    });
    this.refreshTurnMessages();
  }

  toggleBuilding(suit, index) {
    this.bot.customData.buildings[suit] =
      this.bot.customData.buildings[suit] || [];
    this.bot.customData.buildings[suit][index] =
      !this.bot.customData.buildings[suit][index];

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleProtectionism(isShield: boolean) {
    const prot = this.bot.customData;
    if (isShield) {
      prot.protectionismShield = !prot.protectionismShield;
    } else {
      prot.protectionismSword = !prot.protectionismSword;
    }
    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
