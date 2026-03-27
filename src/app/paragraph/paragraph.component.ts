import { Component, Input, inject } from '@angular/core';
import { Bot } from '../models/bot';
import { BotService } from '../bot.service';
import { RendererService } from '../renderer.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, IonicModule } from '@ionic/angular';

export interface MetaData {
  text: string;
  type: string;
  value: string | number;
}
@Component({
  selector: 'app-para',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  imports: [IonicModule],
})
export class ParagraphComponent {
  rendererService = inject(RendererService);
  translateService = inject(TranslateService);
  botService = inject(BotService);
  toastController = inject(ToastController);

  @Input() public metadata!: MetaData;
  @Input() public bot!: Bot;

  public async updateScore(score: number): Promise<void> {
    this.bot.addVP(score);
    const botname = this.botService.botMeta[this.bot.name].fullName;
    const translatedBotName = this.translateService.instant(
      'Factions.' + botname,
    );

    const toast = await this.toastController.create({
      message: this.translateService.instant('ToastMessages.UpdateScore', {
        botname: translatedBotName,
        addend: score,
      }),
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: this.translateService.instant('ToastMessages.Actions.Undo'),
          handler: () => {
            this.bot.addVP(-score);
          },
        },
      ],
    });
    toast.present();
  }

  public getScoreValue(): number {
    if (typeof this.metadata.value === 'number') {
      return this.metadata.value;
    }

    const parsed = Number(this.metadata.value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
