import { Component, inject } from '@angular/core';

import {
  AlertController,
  PopoverController,
  IonicModule,
} from '@ionic/angular';
import { FactionMenuComponent } from '../faction-menu/faction-menu.component';
import { BotService } from '../bot.service';
import { Bot, BotName } from '../models/bot';
import { MarquiseComponent } from '../marquise/marquise.component';
import { EyrieComponent } from '../eyrie/eyrie.component';
import { WoodlandComponent } from '../woodland/woodland.component';
import { VagabondComponent } from '../vagabond/vagabond.component';
import { MarquiseDCComponent } from '../marquise-dc/marquise-dc.component';
import { EyrieDCComponent } from '../eyrie-dc/eyrie-dc.component';
import { WoodlandDCComponent } from '../woodland-dc/woodland-dc.component';
import { VagabondDCComponent } from '../vagabond-dc/vagabond-dc.component';
import { DuchyComponent } from '../drillbit-duchy/drillbit-duchy.component';
import { CorvidComponent } from '../cogwheel-corvids/cogwheel-corvids.component';
import { LizardComponent } from '../logical-lizards/logical-lizards.component';
import { RiverfolkComponent } from '../riverfolk-robots/riverfolk-robots.component';
import { LegionComponent } from '../looting-legion/looting-legion.component';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    MarquiseComponent,
    EyrieComponent,
    WoodlandComponent,
    VagabondComponent,
    MarquiseDCComponent,
    EyrieDCComponent,
    WoodlandDCComponent,
    VagabondDCComponent,
    DuchyComponent,
    CorvidComponent,
    LizardComponent,
    RiverfolkComponent,
    LegionComponent,
    TranslatePipe,
  ],
})
export class HomePage {
  private popoverCtrl = inject(PopoverController);
  private alertCtrl = inject(AlertController);
  botService = inject(BotService);

  public async addBot(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: FactionMenuComponent,
      event: ev,
      translucent: true,
      cssClass: 'wider',
    });

    popover.onDidDismiss().then((res) => {
      if (!res || !res.data) {
        return;
      }
      const botName = res.data as BotName;
      this.botService.addBot(
        new (this.botService.botHash[botName] as new () => Bot)(),
      );
    });

    return await popover.present();
  }

  public async reset() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Your Bots?',
      message:
        'This will reset all rules, victory points, traits, and any other settings you have set.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes, reset!',
          handler: () => {
            this.botService.clearBots();
          },
        },
      ],
    });

    await alert.present();
  }
}
