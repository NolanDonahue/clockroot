import { Component, OnInit, Input, inject } from '@angular/core';
import { LizardBot } from '../models/lizard';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../paragraph/paragraph.component';

@Component({
  selector: 'app-lizard',
  templateUrl: './logical-lizards.component.html',
  styleUrls: ['./logical-lizards.component.scss'],
  standalone: false,
})
export class LizardComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot: LizardBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  public buildings = [
    { suit: 'fox', building: 'garden' },
    { suit: 'bunny', building: 'garden' },
    { suit: 'mouse', building: 'garden' },
  ];
  public acolyteActions = [
    'assets/inicon/token-convert.png',
    'assets/inicon/token-crusade.png',
    'assets/inicon/token-convert.png',
    'assets/inicon/token-crusade.png',
    'assets/inicon/token-sanctify.png',
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

    if (this.bot.customData.conspiracyIndex === undefined) {
      this.bot.customData.conspiracyIndex = 4;
    }
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

  modifyAcolyte(diff = 1) {
    this.bot.customData.acolyteTracker = Math.max(
      this.bot.customData.acolyteTracker + diff,
      0,
    );

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  advanceConspiracy() {
    this.bot.customData.conspiracyIndex =
      (this.bot.customData.conspiracyIndex + 1) % 5;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
