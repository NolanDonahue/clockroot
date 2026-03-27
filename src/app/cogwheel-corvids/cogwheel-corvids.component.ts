import { Component, Input, OnInit, inject } from '@angular/core';
import { CorvidBot } from '../models/corvid';
import { BotService } from '../bot.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { MetaData, ParagraphComponent } from '../paragraph/paragraph.component';
import { IonicModule } from '@ionic/angular';
import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { FormatPipe } from '../format.pipe';

type PlotType = 'bomb' | 'snare' | 'extortion' | 'raid';
@Component({
  selector: 'app-corvid',
  templateUrl: './cogwheel-corvids.component.html',
  styleUrls: ['./cogwheel-corvids.component.scss'],
  imports: [
    IonicModule,
    BotResourcesComponent,
    ParagraphComponent,
    TranslatePipe,
    FormatPipe,
  ],
})
export class CorvidComponent implements OnInit {
  botService = inject(BotService);
  translateService = inject(TranslateService);

  @Input() public bot!: CorvidBot;
  public birdsongMessages: MetaData[] = [];
  public daylightMessages: MetaData[] = [];
  public eveningMessages: MetaData[] = [];
  public plotRuleMessages: MetaData[] = [];
  public botRuleMessages: MetaData[] = [];

  public plots: {
    type: PlotType;
    name: string;
  }[] = [
    { type: 'bomb', name: 'Bomb' },
    { type: 'snare', name: 'Snare' },
    { type: 'extortion', name: 'Extortion' },
    { type: 'raid', name: 'Raid' },
  ];

  ngOnInit() {
    this.plots.forEach((p) => {
      this.bot.customData.plots[p.type] = this.bot.customData.plots[p.type] || [
        false,
        false,
      ];
    });
    this.refreshTurnMessages();
  }

  private refreshTurnMessages() {
    this.birdsongMessages = this.bot.birdsong(this.translateService);
    this.daylightMessages = this.bot.daylight(this.translateService);
    this.eveningMessages = this.bot.evening(this.translateService);
    this.plotRuleMessages = this.bot.plotRules(this.translateService);
    this.botRuleMessages = this.bot.botRules(this.translateService);
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

  // Cycles the plot token: //true = face-up // false = stowed or face-down
  cyclePlot(type: PlotType, index: number) {
    this.bot.customData.plots[type][index] =
      !this.bot.customData.plots[type][index];
    const botPlot = this.bot.customData.plots;
    const currentState = botPlot[type][index];
    let faceUpCount = 0;

    for (const plot in botPlot) {
      for (const i in botPlot[plot]) {
        if (botPlot[plot][i]) {
          faceUpCount++;
        }
      }
    }

    const notTracked = 8 - this.bot.customData.stowedPlots - faceUpCount;

    if (currentState) {
      if (notTracked <= 0) {
        this.modifyPlot(notTracked - 1);
      }
    } else if (!currentState) {
      if (notTracked >= 0) {
        this.modifyPlot(1);
      }
    }

    this.botService.saveBots();
    this.refreshTurnMessages();
  }

  // Returns the correct icon path based on the token's current state

  modifyPlot(diff = 1, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.bot.customData.stowedPlots = Math.max(
      this.bot.customData.stowedPlots + diff,
      -1,
    );

    this.botService.saveBots();
    this.refreshTurnMessages();
  }
}
