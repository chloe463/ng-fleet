import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'fr-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class FrChipComponent implements OnInit {

  @HostBinding('class.fr-chip-host') chipHost = true;

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
