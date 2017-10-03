# Toaster

## Usage

```ts
import { FrToasterService, FrToasterParam } from 'francette';

@Component({
  selector: 'toaster-demo',
  template: `
  <button class="fr-btn fr-btn--primary" frRipple (click)="popupToaster()">POPUP TOASTER</button>
  <!-- Entry point to put toaster component -->
  <fr-toaster-entry></fr-toaster-entry>
  `,
  providers: [ FrToasterService ]
})
export class ToasterDemoComponent {

  constructor(private toasterService: FrToasterService) {}

  public popupToaster(): void {
    const toasterParam: FrToasterParam = {
      text: 'test',
      action: 'undo',
      timeout: 2000
    };
    this.toasterService.open<any>(toasterParam).subscribe(
      (value) => { /* onNext */ },
      (reason) => { /* onError */ },
      () => { /* onComplete */ }
    );
  }

}
```
