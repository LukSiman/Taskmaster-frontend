import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbCollapseModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']

})
export class NavbarComponent implements OnInit {

  //tracks if menu is collapsed
  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  //adds active class to the nav item
  makeActive(element: HTMLElement){
    let currentActivePage = document.querySelector(".active");
    currentActivePage?.classList.remove("active");
    console.log(currentActivePage);

    console.log(element);
    element.classList.add("active");

    //TODO: FINISH THIS
  }
}
