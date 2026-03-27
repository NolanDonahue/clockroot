import { Component, inject } from '@angular/core';
import { PopoverController, IonicModule } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-faction-menu',
  templateUrl: './faction-menu.component.html',
  styleUrls: ['./faction-menu.component.scss'],
  imports: [IonicModule, TranslatePipe],
})
export class FactionMenuComponent {
  popoverCtrl = inject(PopoverController);

  public originalFactions = [
    {
      name: 'Automated Alliance',
      id: 'Woodland',
      icon: 'woodland',
    },
    {
      name: 'Electric Eyrie',
      id: 'Eyrie',
      icon: 'eyrie',
    },
    {
      name: 'Mechanical Marquise',
      id: 'Marquise',
      icon: 'marquise',
    },
    {
      name: 'Vagabot',
      id: 'Vagabond',
      icon: 'vagabond',
    },
  ];

  public dcFactions = [
    {
      name: 'Automated Alliance (DC)',
      id: 'WoodlandDC',
      icon: 'woodland',
    },
    {
      name: 'Electric Eyrie (DC)',
      id: 'EyrieDC',
      icon: 'eyrie',
    },
    {
      name: 'Mechanical Marquise (DC)',
      id: 'MarquiseDC',
      icon: 'marquise',
    },
    {
      name: 'Vagabot (DC)',
      id: 'VagabondDC',
      icon: 'vagabond',
    },
  ];

  public expansion2Factions = [
    {
      name: 'Cogwheel Corvids',
      id: 'Corvid',
      icon: 'corvid',
    },
    {
      name: 'Drillbit Duchy',
      id: 'Duchy',
      icon: 'duchy',
    },
    {
      name: 'Logical Lizards',
      id: 'Lizard',
      icon: 'lizard',
    },
    {
      name: 'Riverfolk Robots',
      id: 'Riverfolk',
      icon: 'riverfolk',
    },
  ];

  public expansion3Factions = [
    {
      name: 'Looting Legion',
      id: 'Legion',
      icon: 'legion',
    },
  ];

  close(res: string) {
    this.popoverCtrl.dismiss(res);
  }
}
