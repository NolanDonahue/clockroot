import { Component, OnInit, Input, inject } from '@angular/core';
import { LegionBot } from '../models/legion';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-legion',
  templateUrl: './looting-legion.component.html',
  styleUrls: ['./looting-legion.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class LegionComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: LegionBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];
  public extraMessages: MetaData[] = [];

  ngOnInit() {
    this.bot.customData.hoardItems = this.bot.customData.hoardItems || [];
    this.refreshTurnMessages();
  }

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
    this.extraMessages = this.bot.extra(this.translateService);
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

  addHoardItems($event: Event, item: string) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    const hoard = this.bot.customData.hoardItems;

    if (hoard.length < 4) {
      hoard.push(item);
      this.botService.saveBots();
      this.refreshTurnMessages();
    }
  }

  removeHoardItem($event: Event, index: number) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    const hoard = this.bot.customData.hoardItems;

    if (hoard[index]) {
      hoard.splice(index, 1);
      this.botService.saveBots();
      this.refreshTurnMessages();
    }
  }
}
