import { Component, Input, inject } from '@angular/core';
import { Bot, Item } from '../models/bot';
import { BotService } from '../bot.service';

@Component({
  selector: 'app-bot-resources',
  templateUrl: './bot-resources.component.html',
  styleUrls: ['./bot-resources.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class BotResourcesComponent {
  private botService = inject(BotService);

  @Input() public bot: Bot;
  @Input() public isVaga: boolean;

  public get itemImages() {
    return this.botService.itemImages;
  }

  public get itemOrder(): Item[] {
    return this.isVaga ? this.vagaItemOrder : this.defaultItemOrder;
  }

  public defaultItemOrder: Item[] = [
    'Sack',
    'Sack2',
    'Boot',
    'Boot2',
    'Sword',
    'Sword2',
    'Tea',
    'Tea2',
    'Coin',
    'Coin2',
    'Crossbow',
    'Hammer',
  ];

  public vagaItemOrder: Item[] = Object.keys(this.itemImages) as Item[];

  setVP($event) {
    this.botService.setVP(this.bot, $event.detail.value);
  }

  toggleItem(item) {
    this.botService.toggleItem(this.bot, item);
  }
}
