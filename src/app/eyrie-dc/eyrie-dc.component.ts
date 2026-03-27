import { Component, OnInit, Input, inject } from '@angular/core';
import { EyrieBotDC } from '../models/eyrie-dc';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-eyrie-dc',
  templateUrl: './eyrie-dc.component.html',
  styleUrls: ['./eyrie-dc.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class EyrieDCComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: EyrieBotDC;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];
  public turmoilMessages: MetaData[] = [];

  ngOnInit() {
    this.bot.customData.buildings = this.bot.customData.buildings || [];
    this.refreshTurnMessages();
  }

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
    this.turmoilMessages = this.bot.turmoil(this.translateService);
  }

  toggleSetup() {
    this.botService.toggleSetup(this.bot);
    this.refreshTurnMessages();
  }

  changeDifficulty(difficulty: string) {
    this.botService.changeDifficulty(this.bot, difficulty);
    this.refreshTurnMessages();
  }

  modifySuitCard(suit: string, diff = 1) {
    this.bot.customData.decree[suit] = Math.max(
      this.bot.customData.decree[suit] + diff,
      0,
    );

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleBuilding(index: number) {
    this.bot.customData.buildings[index] =
      !this.bot.customData.buildings[index];

    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
