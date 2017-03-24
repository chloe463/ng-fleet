import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'fr-chip',
  templateUrl: './chip.component.html'
})
export class FrChipComponent implements OnInit {

  @Input() on = false;

  @Output() dismiss = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public disappear(): void {
    this.dismiss.emit();
  }

  public toggleOn(): void {
    this.on = !this.on;
  }

}
