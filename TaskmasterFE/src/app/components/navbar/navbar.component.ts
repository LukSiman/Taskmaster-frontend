import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.makeActive();
  }

  //adds active class to the nav item
  makeActive(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let url = event.url.slice(1);
        let newPage = document.querySelector(`#${url}`);

        let currentActivePage = document.querySelector(".active");
        currentActivePage!.ariaCurrent = "false";
        currentActivePage!.classList.remove("active");

        newPage!.classList.add("active");
        newPage!.ariaCurrent = "page";
      }
    });
  }

  //adds active class to the nav item
  // makeActive(element: HTMLElement) {
  // let currentActivePage = document.querySelector(".active");
  // currentActivePage!.ariaCurrent = "false";
  // currentActivePage!.classList.remove("active");
  // // console.log(currentActivePage); TODO:Remove

  // // console.log(element); TODO:Remove
  // element.classList.add("active");
  // element.ariaCurrent = "page";
  // }
}
