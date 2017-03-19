import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class FrNavbarMenuComponent implements OnInit {

  @Input() link: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
