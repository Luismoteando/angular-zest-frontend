import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  name: any = 'Luis Miguel';
  surname: any = 'Ortiz Rozalén';
  isNavbarCollapsed: any = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
