import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class LizardBot extends Bot {

  public name: BotName = 'Lizard';

  public setupPosition = 'F';
  public setupRules = [
    `Setup0`,
    `Setup1`,
    `Setup2`,
    `Setup3`,
    `Setup4`
  ];

  public difficultyDescriptions = {
    Easy: `Easy`,
    Normal: 'Normal',
    Challenging: `Challenging`,
    Nightmare: `Nightmare`
  };

  public rules = [
    {
      traitName: 'Poor Manual Dexterity',
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true
    },
    {
      traitName: 'Hates Surprises',
      name: 'RuleHatesSurprises',
      text: 'TextHatesSurprises',
      isActive: true
    },
    {
      traitName: 'Pilgrims',
      name: 'RulePilgrims',
      text: 'TextPilgrims',
      isActive: true
    },
    {
      traitName: 'Robot Revenge',
      name: 'RuleRobotRevenge',
      text: 'TextRobotRevenge',
      isActive: true
    },
    {
      traitName: 'Fanatics',
      name: 'RuleFanatics',
      text: 'TextFanatics',
      canToggle: true
    },
    {
      traitName: 'Martyrs',
      name: 'RuleMartyrs',
      text: `TextMartyrs`,
      canToggle: true
    },
    {
      traitName: 'Erratic',
      name: 'RuleErratic',
      text: `TextErratic`,
      canToggle: true
    },
    {
      traitName: 'Spiteful',
      name: 'RuleSpiteful',
      text: `TextSpiteful`,
      canToggle: true
    },
  ];
  // This one is gonna need a sermon on the mount with how whacky Lizards is. SpecificExtras may need to be used to address Lost Souls, Conspiracies, Acolytes... I'll probably think about this one last.
  public customData = {
    currentSuit: 'bird',

    buildings: {
      fox: [],
      bunny: [],
      mouse: []
    },    

    acolyteTracker: 0,
  };

  public setup(): void {
  }

  public birdsong(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Logical Lizards.Outcasts`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Logical Lizards.Conspiracy`, {suit})),
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const difficulty = (this.difficulty === "Easy" ? 3 : this.difficulty === "Normal" ? 4 : this.difficulty === "Challenging" ? 5 : 5);
    const checkBird = suit==="bird";
    const base = []

    base.push(this.createMetaData('text', '', translate.instant(`SpecificDaylight.Logical Lizards.Rituals`, {suit, difficulty}) + 
  (checkBird ? translate.instant(`SpecificDaylight.Logical Lizards.RitualsBird`,{suit}) : translate.instant(`SpecificDaylight.Logical Lizards.RitualsOther`,{suit}))))
    
    return base
  }

  public evening(translate: TranslateService) {
    const base = [
        this.createMetaData('score', 1, translate.instant(`SpecificEvening.Logical Lizards.Score`)),
        this.createMetaData('text', '', translate.instant(`SpecificEvening.Logical Lizards.DiscardLostSouls`)),
        this.createMetaData('text', '', translate.instant(`SpecificEvening.Logical Lizards.ReturnRevealedCards`)),
        this.createMetaData('score', 1, translate.instant(`SpecificEvening.Logical Lizards.Craft`)),
    ]

    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie (DC).NightmareScore'))
      );
    }

    base.push(
      (
        
     this.createMetaData('text','',
      (this.rules.some(rules=>rules.traitName==="Erratic" && rules.isActive) ?
      translate.instant(`SpecificEvening.Logical Lizards.ErraticReminder`) : ''))
      )
    )

    return base;
  
  }

  public extra(translate:TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '',translate.instant(`SpecificExtra.Logical Lizards.Lost Souls`)),
      this.createMetaData('text', '',translate.instant(`SpecificExtra.Logical Lizards.Conspiracy`, {suit}))
    ]
  }
}
