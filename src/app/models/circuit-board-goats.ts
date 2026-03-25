import { TranslateService } from "@ngx-translate/core";
import { Bot, BotName } from "./bot";
import { MetaData } from "../paragraph/paragraph.component";

export const BIG_TOP_COUNT = 2;

export class CircuitBoardGoatsBot extends Bot {
  public name: BotName = "CircuitBoardGoats";

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
      traitName: "Martial Audience",
      name: "RuleMartialAudienceCBG",
      text: "TextMartialAudienceCBG",
      canToggle: true,
    },
    {
      traitName: "Standing Ovation",
      name: "RuleStandingOvationCBG",
      text: "TextStandingOvationCBG",
      canToggle: true,
    },
    {
      traitName: "Fire Breathing",
      name: "RuleFireBreathingCBG",
      text: "TextFireBreathingCBG",
      canToggle: true,
    },
    {
      traitName: "Special Effects",
      name: "RuleSpecialEffectsCBG",
      text: "TextSpecialEffectsCBG",
      canToggle: true,
    },
  ];

  public customData = {
    currentSuit: "bird",
    /** Same convention as Drillbit tunnels: `true` = in supply, `false` = on map */
    bigTops: [false, false] as boolean[],
  };

  public setup(): void {}

  public birdsong(translate: TranslateService) {
    const steps = [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificBirdsong.Circuit Board Goats.RevealOrder"),
      ),
      this.createMetaData(
        "score",
        1,
        translate.instant("SpecificBirdsong.Circuit Board Goats.CraftOrder"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificBirdsong.Circuit Board Goats.Endorse"),
      ),
    ];

    if (this.hasTrait("Standing Ovation")) {
      steps.push(
        this.createMetaData(
          "score",
          1,
          translate.instant(
            "SpecificBirdsong.Circuit Board Goats.StandingOvation",
          ),
        ),
      );
    }

    return steps;
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const recruit = this.createMetaData(
      "text",
      "",
      translate.instant("SpecificDaylight.Circuit Board Goats.Recruit", {
        suit,
      }),
    );

    let battleText = translate.instant(
      "SpecificDaylight.Circuit Board Goats.Battle",
      { suit },
    );
    if (this.hasTrait("Fire Breathing")) {
      battleText += translate.instant(
        "SpecificDaylight.Circuit Board Goats.FireBreathingReminder",
      );
    }

    const battle = this.createMetaData("text", "", battleText);

    let popupText = translate.instant(
      "SpecificDaylight.Circuit Board Goats.PopupTent",
      { suit },
    );
    if (this.hasTrait("Martial Audience")) {
      popupText += translate.instant(
        "SpecificDaylight.Circuit Board Goats.MartialAudiencePopup",
      );
    }

    const popup = this.createMetaData("text", "", popupText);

    return [recruit, battle, popup];
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const steps = [
      this.createMetaData(
        "score",
        1,
        translate.instant("SpecificEvening.Circuit Board Goats.Play", { suit }),
      ),
    ];

    if (this.hasTrait("Martial Audience")) {
      steps.push(
        this.createMetaData(
          "score",
          1,
          translate.instant(
            "SpecificEvening.Circuit Board Goats.MartialAudiencePlay",
          ),
        ),
      );
    }

    steps.push(
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Circuit Board Goats.Credit", {
          suit,
        }),
      ),
    );

    steps.push(
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreSummary"),
      ),
    );

    if (this.difficulty === "Nightmare") {
      steps.push(
        this.createMetaData(
          "score",
          1,
          translate.instant(
            "SpecificEvening.Circuit Board Goats.NightmareScore",
          ),
        ),
      );
    }

    return steps;
  }

  /** Encore sub-steps with score buttons where applicable */
  public encoreSteps(translate: TranslateService) {
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreIntro"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreBirds"),
      ),
      this.createMetaData(
        "score",
        3,
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreSuits"),
      ),
      this.createMetaData(
        "score",
        1,
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreTwoFox"),
      ),
      this.createMetaData(
        "score",
        1,
        translate.instant(
          "SpecificEvening.Circuit Board Goats.EncoreTwoRabbit",
        ),
      ),
      this.createMetaData(
        "score",
        1,
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreTwoMouse"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificEvening.Circuit Board Goats.EncoreOnce"),
      ),
    ];
  }

  public reminderRules(translate: TranslateService) {
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.Surveilled"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.Animatronics"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.BigTopLoss"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.CriticsStack"),
      ),
    ];
  }

  public botRules(translate: TranslateService) {
    return [
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.RiverfolkBasic"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.RiverfolkAdv"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.Mob"),
      ),
      this.createMetaData(
        "text",
        "",
        translate.instant("SpecificExtra.Circuit Board Goats.Homeland"),
      ),
    ];
  }
}
