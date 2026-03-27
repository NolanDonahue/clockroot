import { Component, Input, OnInit, inject } from '@angular/core';
import { VagaBotDC } from '../models/vagabond-dc';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { KeyValuePipe } from '@angular/common';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-vagabond-dc',
  templateUrl: './vagabond-dc.component.html',
  styleUrls: ['./vagabond-dc.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    KeyValuePipe,
    TranslatePipe,
    FormatPipe,
  ],
})
export class VagabondDCComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: VagaBotDC;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];

  public get descriptions() {
    return this.bot.descriptions;
  }

  public get battleTrackBonus(): string {
    const total = Object.values(this.bot.customData.satchelItems).filter(
      (x) => x === 3,
    ).length;

    switch (total) {
      case 0:
        return 'BattleTrack0';
      case 1:
        return 'BattleTrack1';
      case 2:
        return 'BattleTrack2';
      case 3:
        return 'BattleTrack3';
      default:
        return 'You have too many, or not enough battle track items.';
    }
  }

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

  changeVaga(newVaga: string) {
    this.bot.customData.chosenVaga = newVaga;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleSatchelItem(item: string) {
    this.bot.customData.satchelItems[item]++;
    if (this.bot.customData.satchelItems[item] >= 4) {
      this.bot.customData.satchelItems[item] = 0;
    }

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  removeSatchelItem($event: Event, item: string) {
    $event.preventDefault();
    $event.stopPropagation();
    delete this.bot.customData.satchelItems[item];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  changeSuit(suit: string) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
