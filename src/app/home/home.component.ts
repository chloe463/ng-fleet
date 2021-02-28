import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public components = [
    {
      name: 'Buttons',
      image: 'assets/images/buttons.png',
      url: '/buttons',
    },
    {
      name: 'Chips',
      image: 'assets/images/chips.png',
      url: '/chips',
    },
    {
      name: 'Data-table',
      image: 'assets/images/data-table.png',
      url: '/data-table',
    },
    {
      name: 'Dialog',
      image: 'assets/images/dialog.png',
      url: '/dialog',
    },
    {
      name: 'Forms',
      image: 'assets/images/forms.png',
      url: '/forms',
    },
    {
      name: 'Progress',
      image: 'assets/images/progress-spinner.png',
      url: '/progress',
    },
    {
      name: 'Tabs',
      image: 'assets/images/tabs.png',
      url: '/tabs',
    },
    {
      name: 'Toaster',
      image: 'assets/images/toast.png',
      url: '/toaster',
    },
    {
      name: 'Tooltip',
      image: 'assets/images/tooltip.png',
      url: '/tooltip',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
