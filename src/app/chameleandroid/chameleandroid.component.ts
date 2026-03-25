import { Component, OnInit, Input } from "@angular/core";
import { ChameleandroidBot, EGO_TRACK_VALUES } from "../models";
import { BotService } from "../bot.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-chameleandroid",
  templateUrl: "./chameleandroid.component.html",
  styleUrls: ["./chameleandroid.component.scss"],
})
export class ChameleandroidComponent implements OnInit {
  @Input() public bot: ChameleandroidBot;

  /** Slot indices 0 … last ego track index */
  public readonly egoSlotIndices = Array.from(
    { length: EGO_TRACK_VALUES.length },
    (_, i) => i,
  );

  constructor(
    public botService: BotService,
    public translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.normalizeEgoTrack();
    const idVal = this.bot.customData.id;
    this.bot.customData.id = idVal != null ? idVal : 0;
    const escVal = this.bot.customData.useEscalatedDaylight;
    this.bot.customData.useEscalatedDaylight =
      escVal != null ? escVal : false;
    this.botService.saveBots();
  }

  /**
   * Ensures `egoTrack` is length `EGO_TRACK_VALUES.length` with `[legacyEgoFlag, vp]` per slot (`false` = on track).
   * Migrates legacy `ego` + `egoValues` from older saves.
   */
  private normalizeEgoTrack(): void {
    const n = EGO_TRACK_VALUES.length;
    const cd = this.bot.customData as ChameleandroidBot["customData"] & {
      ego?: boolean[];
      egoValues?: number[];
    };

    let track: [boolean, number][];

    if (Array.isArray(cd.egoTrack) && cd.egoTrack.length === n) {
      track = cd.egoTrack.map((slot, i) => {
        if (Array.isArray(slot) && slot.length >= 2) {
          return [!!slot[0], Number(slot[1])] as [boolean, number];
        }
        return [false, EGO_TRACK_VALUES[i]];
      });
    } else if (Array.isArray(cd.ego) && Array.isArray(cd.egoValues)) {
      const ego = cd.ego;
      const egoValues = cd.egoValues;
      track = EGO_TRACK_VALUES.map((defaultVp, i) => {
        const off = ego[i];
        const vp = egoValues[i];
        return [
          typeof off === "boolean" ? off : false,
          vp != null ? Number(vp) : defaultVp,
        ] as [boolean, number];
      });
    } else {
      track = EGO_TRACK_VALUES.map((vp) => [false, vp] as [boolean, number]);
    }

    cd.egoTrack = track;
    delete cd.ego;
    delete cd.egoValues;
  }

  trackBySlot(index: number, i: number): number {
    return i;
  }

  changeSuit(suit: string) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  toggleEgo(index: number) {
    this.normalizeEgoTrack();
    const slot = this.bot.customData.egoTrack[index];
    if (slot) {
      slot[0] = !slot[0];
    }
    this.botService.saveBots();
  }

  modifyId(delta: number) {
    const curId = this.bot.customData.id;
    const idBase = curId != null ? curId : 0;
    this.bot.customData.id = Math.max(
      0,
      Math.min(EGO_TRACK_VALUES.length, idBase + delta),
    );
    this.botService.saveBots();
  }

  toggleEscalatedDaylight(event: CustomEvent) {
    this.bot.customData.useEscalatedDaylight = event.detail.checked;
    this.botService.saveBots();
  }
}
