import { Component, OnInit, Input, inject } from '@angular/core';
import { RiverfolkBot } from '../models/riverfolk';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-riverfolk',
  templateUrl: './riverfolk-robots.component.html',
  styleUrls: ['./riverfolk-robots.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class RiverfolkComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: RiverfolkBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];
  public tradePostMessages: MetaData[] = [];
  public servicesMessages: MetaData[] = [];

  public buildings: {
    suit: 'fox' | 'bunny' | 'mouse';
    building: 'tradingpost';
  }[] = [
    { suit: 'fox', building: 'tradingpost' },
    { suit: 'bunny', building: 'tradingpost' },
    { suit: 'mouse', building: 'tradingpost' },
  ];

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
    this.tradePostMessages = this.bot.tradePost(this.translateService);
    this.servicesMessages = this.bot.services(this.translateService);
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

  toggleBuilding(suit: 'fox' | 'bunny' | 'mouse', index: number) {
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
