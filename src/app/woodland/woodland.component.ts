import { Component, Input, inject } from '@angular/core';
import { WoodlandBot } from '../models/woodland';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../paragraph/paragraph.component';

@Component({
  selector: 'app-woodland',
  templateUrl: './woodland.component.html',
  styleUrls: ['./woodland.component.scss'],
  standalone: false,
})
export class WoodlandComponent {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot: WoodlandBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  public sympathyScores = [0, 1, 1, 1, 1, 2, 2, 3, 3, 4];

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
  }

  ngOnInit() {
    this.refreshTurnMessages();
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

  toggleSympathy(pos) {
    this.bot.customData.sympathy[pos] = !this.bot.customData.sympathy[pos];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleBuilding(suit) {
    this.bot.customData.buildings[suit] = !this.bot.customData.buildings[suit];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
