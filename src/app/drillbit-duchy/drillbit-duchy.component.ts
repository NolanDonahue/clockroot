import { Component, OnInit, Input, inject } from '@angular/core';
import { DuchyBot } from '../models/duchy';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-duchy',
  templateUrl: './drillbit-duchy.component.html',
  styleUrls: ['./drillbit-duchy.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class DuchyComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: DuchyBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  ngOnInit() {
    this.bot.customData.citadels = this.bot.customData.citadels || [
      false,
      false,
      false,
    ];
    this.bot.customData.markets = this.bot.customData.markets || [
      false,
      false,
      false,
    ];
    this.bot.customData.tunnels = this.bot.customData.tunnels || [
      false,
      false,
      false,
    ];
    this.bot.customData.burrow = this.bot.customData.burrow || 0;
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

  changeSuit(suit: string) {
    if (!['bird', 'fox', 'bunny', 'mouse'].includes(suit)) {
      return;
    }
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  // Toggles true/false for Citadels, Markets, and Tunnels
  toggleTracker(type: 'citadels' | 'markets' | 'tunnels', index: number) {
    this.bot.customData[type][index] = !this.bot.customData[type][index];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  // Toggles the minister's swayed status
  toggleMinister(index: number) {
    this.bot.customData.ministers[index].swayed =
      !this.bot.customData.ministers[index].swayed;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  // Changes the number of warriors in the Burrow
  modifyBurrow(diff = 1) {
    this.bot.customData.burrow = Math.max(this.bot.customData.burrow + diff, 0);

    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
