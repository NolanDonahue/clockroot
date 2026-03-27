import { Component, Input, OnInit, inject } from '@angular/core';
import { WoodlandBotDC } from '../models/woodland-dc';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';
@Component({
  selector: 'app-woodland-dc',
  templateUrl: './woodland-dc.component.html',
  styleUrls: ['./woodland-dc.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class WoodlandDCComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: WoodlandBotDC;
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

  toggleSympathy(pos: number) {
    this.bot.customData.sympathy[pos] = !this.bot.customData.sympathy[pos];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  toggleBuilding(suit: string) {
    this.bot.customData.buildings[suit] = !this.bot.customData.buildings[suit];
    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
