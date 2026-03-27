//Leave the imports alone, change literally everything else
import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName, Rule } from './bot';

export class LegionBot extends Bot {
  public name: BotName = 'Legion';

  public setupPosition = 'J';
  public setupRules = ['Setup0', 'Setup1', 'Setup2'];

  public difficultyDescriptions = {
    Easy: `Easy`,
    Normal: 'Normal',
    Challenging: `Challenging`,
    Nightmare: `Nightmare`,
  };

  public rules: Rule[] = [
    {
      traitName: 'Automated Looters',
      name: 'RuleAutomatedLooters',
      text: `TextAutomatedLooters`,
      isActive: true,
    },
    {
      traitName: 'Poor Manual Dexterity',
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true,
    },
    {
      traitName: 'Hates Surprises',
      name: 'RuleHatesSurprises',
      text: 'TextHatesSurprises',
      isActive: true,
    },
    {
      traitName: 'Warlord',
      name: 'RuleWarlord',
      text: `TextWarlord`,
      isActive: true,
    },
  ];

  public customData: {
    currentSuit: string;
    hoardItems: string[];
    itemList: string[];
  } = {
    currentSuit: 'bird',

    hoardItems: [],

    itemList: ['sack', 'boot', 'sword', 'tea', 'coin', 'crossbow', 'hammer'],
  };

  public setup(): void {
    // Intentional empty hook for subclasses
  }

  public birdsong(translate: TranslateService) {
    const hoardLength =
      (this.customData.hoardItems && this.customData.hoardItems.length) || 1;
    const hoardNum = Math.min(3, Math.floor(hoardLength / 2) + 1);
    const warriorsWord = hoardNum === 1 ? 'warrior' : 'warriors';

    const base = [
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificBirdsong.Looting Legion.Reveal`),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificBirdsong.Looting Legion.Raze`),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificBirdsong.Looting Legion.Recruit`, {
          hoardNum,
          warriorsWord,
        }),
      ),
    ];
    return base;
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const hoardLength =
      (this.customData.hoardItems && this.customData.hoardItems.length) || 1;
    const hoardNum = Math.min(3, Math.floor(hoardLength / 2) + 1);
    const timesWord = hoardNum === 1 ? 'time' : 'times';

    //You can include logic to spit out the text as appropriate to the faction. It's best to define a base array and add to it
    const base = [
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificDaylight.Looting Legion.Battle`, { suit }),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificDaylight.Looting Legion.Move`, { suit }),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificDaylight.Looting Legion.Build`, { suit }),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificDaylight.Looting Legion.Advance`, {
          hoardNum,
          timesWord,
        }),
      ),
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificDaylight.Looting Legion.Anoint`),
      ),
    ];
    return base;
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    const base = [
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificEvening.Looting Legion.Incite`, { suit }),
      ),
      this.createMetaData(
        'score',
        1,
        translate.instant(`SpecificEvening.Looting Legion.Score`),
      ),
    ];
    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData(
          'score',
          1,
          translate.instant(
            'SpecificEvening.Electric Eyrie (DC).NightmareScore',
          ),
        ),
      );
    }
    base.push(
      this.createMetaData(
        'text',
        '',
        translate.instant(`SpecificEvening.Looting Legion.Discard`),
      ),
    );
    return base;
  }

  public extra(translate: TranslateService) {
    return [
      this.createMetaData(
        'score',
        2,
        translate.instant(`SpecificExtra.Looting Legion.Hoard`),
      ),
    ];
  }
}
