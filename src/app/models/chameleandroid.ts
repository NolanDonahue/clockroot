import { TranslateService } from "@ngx-translate/core";
import { Bot, BotName } from "./bot";
import { MetaData } from "../paragraph/paragraph.component";

export const EGO_TRACK_VALUES = [0, 1, 1, 1, 2, 2, 3, 3];

/** One ego slot: `[flag, vp]` — same as legacy `ego[i]`: `false` = on track (UI + scoring), `true` = off that slot */
export type EgoTrackSlot = [boolean, number];

export class ChameleandroidBot extends Bot {
  public name: BotName = "Chameleandroid";

  public setupPosition = "X";
  public setupRules = ["Setup0", "Setup1"];

  public difficultyDescriptions = {
    Easy: "Easy",
    Normal: "Normal",
    Challenging: "Challenging",
    Nightmare: "Nightmare",
  };

  public rules = [
    {
      traitName: "Poor Manual Dexterity",
      name: "RulePoorManualDexterity",
      text: "TextPoorManualDexterity",
      isActive: true,
    },
    {
      traitName: "Hates Surprises",
      name: "RuleHatesSurprises",
      text: "TextHatesSurprises",
      isActive: true,
    },
    {
      traitName: "Charming Mech",
      name: "RuleCharming",
      text: "TextCharming",
      isActive: true,
    },
    {
      traitName: "Cloaking Tech",
      name: "RuleCloaking",
      text: "TextCloaking",
      isActive: true,
    },
    {
      traitName: "Kingpin",
      name: "RuleKingpin",
      text: "TextKingpin",
      canToggle: true,
    },
    {
      traitName: "City Builder",
      name: "RuleCity",
      text: "TextCity",
      canToggle: true,
    },
    {
      traitName: "Abduction",
      name: "RuleAbduction",
      text: "TextAbduction",
      canToggle: true,
    },
    {
      traitName: "Patron",
      name: "RulePatron",
      text: "TextPatron",
      canToggle: true,
    },
  ];

  public customData = {
    currentSuit: "bird",
    /** Left-to-right slots; Patron may permute the VP numbers while keeping order of slots */
    egoTrack: [
      [false, 0],
      [false, 1],
      [false, 1],
      [false, 1],
      [false, 2],
      [false, 2],
      [false, 3],
      [false, 3],
    ],
    id: 0,
    useEscalatedDaylight: false,
  };

  public getEgoPoints(): number {
    const numEgo =
      this.customData.egoTrack[0].filter((i) => i[0] === true).length > 0
        ? this.customData.egoTrack[0].filter((i) => i[0] === true).length
        : 0;
    return this.customData.egoTrack[0][numEgo][1];
  }

  /** Total VP for Revel (2 leftmost on-track slots) 
   * 
  public getRevelScore(): number {
    const slots = this.getOnTrackSlotIndices();
    if (slots.length === 0) return 6;
    const track = this.customData.egoTrack;
    const a = track[slots[0]];
    const first = a != null && a[1] != null ? a[1] : 0;
    if (slots.length === 1) return first + 3;
    const b = track[slots[1]];
    return first + (b != null && b[1] != null ? b[1] : 0);
  }
  */

  public setup(): void {}

  public birdsong(translate: TranslateService) {
    const base = [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificBirdsong.Chameleandroid.Reveal"),
      ),
      this.createMetaData(
        "score",
        1,
        translate.instant("SpecificBirdsong.Chameleandroid.Craft"),
      ),
    ];

    if (
      this.difficulty === "Easy" &&
      this.customData.egoTrack[0].filter((slot) => slot[0] === true).length > 0
    ) {
      base.push(
        this.createMetaData(
          "text",
          "",
          translate.instant(
            "SpecificDifficulty.Chameleandroid.EasyBirdsongReminder",
          ),
        ),
      );
    }

    if (
      (this.difficulty === "Challenging" || this.difficulty === "Nightmare") &&
      this.customData.egoTrack[0].filter((slot) => slot[0] === true).length > 0
    ) {
      base.push(
        this.createMetaData(
          "text",
          "",
          translate.instant(
            "SpecificDifficulty.Chameleandroid.ChallengingBirdsongReminder",
          ),
        ),
      );
    }

    return base;
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    if (this.customData.useEscalatedDaylight) {
      return this.escalatedDaylight(translate);
    }

    const base = [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificDaylight.Chameleandroid.Appear", {
          suit,
        }),
      ),
      this.createMetaData(
        "score",
        this.getEgoPoints(),
        translate.instant("SpecificDaylight.Chameleandroid.Place"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificDaylight.Chameleandroid.Gentrify"),
      ),
    ];

    return base;
  }

  public escalatedDaylight(translate: TranslateService): MetaData[] {
    const suit = this.customData.currentSuit;
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Escalated.Target", {
          suit,
        }),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Escalated.Terminate"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Escalated.Battle"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Escalated.Recharge"),
      ),
    ];
  }

  public evening(translate: TranslateService) {
    const base = [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Chameleandroid.Disappear"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Chameleandroid.Discard"),
      ),
    ];

    if (this.difficulty === "Nightmare") {
      base.push(
        this.createMetaData(
          "score",
          1,
          translate.instant("SpecificEvening.Chameleandroid.NightmareScore"),
        ),
      );
    }

    return base;
  }

  public botRules(translate: TranslateService) {
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.GentrifyInteractions"),
      ),
    ];
  }

  public reminderRules(translate: TranslateService) {
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Ego"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Id"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Chameleandroid.Interactions"),
      ),
    ];
  }
}
