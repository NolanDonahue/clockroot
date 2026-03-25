import { Component, OnInit, Input } from "@angular/core";
import { BIG_TOP_COUNT, CircuitBoardGoatsBot } from "../models";
import { BotService } from "../bot.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-circuit-board-goats",
  templateUrl: "./circuit-board-goats.component.html",
  styleUrls: ["./circuit-board-goats.component.scss"],
})
export class CircuitBoardGoatsComponent implements OnInit {
  @Input() public bot: CircuitBoardGoatsBot;

  public readonly bigTopIndices = Array.from(
    { length: BIG_TOP_COUNT },
    (_, i) => i,
  );

  constructor(
    public botService: BotService,
    public translateService: TranslateService,
  ) {}

  ngOnInit() {
    const tops = this.bot.customData.bigTops;
    if (!Array.isArray(tops) || tops.length !== BIG_TOP_COUNT) {
      this.bot.customData.bigTops = [false, false];
    } else {
      this.bot.customData.bigTops = tops.map((v) => !!v);
    }
    this.botService.saveBots();
  }

  changeSuit(suit: string) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  toggleBigTop(index: number) {
    this.bot.customData.bigTops[index] = !this.bot.customData.bigTops[index];
    this.botService.saveBots();
  }
}
