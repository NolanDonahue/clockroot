import { Component, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-priority-modal',
  templateUrl: './priority-modal.component.html',
  styleUrls: ['./priority-modal.component.scss'],
  imports: [IonicModule, TranslatePipe],
})
export class PriorityModalComponent {
  private modalCtrl = inject(ModalController);

  public img = 'fall';

  public buttonsAndImages = [
    {
      name: 'Fall',
      map: 'fall',
    },
    {
      name: 'Winter',
      map: 'winter',
    },
    {
      name: 'Lake',
      map: 'lake',
    },
    {
      name: 'Mountain',
      map: 'mountain',
    },
  ];

  changeMap(img: string) {
    this.img = img;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
