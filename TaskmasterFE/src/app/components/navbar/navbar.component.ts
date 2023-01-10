import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    // console.log(this.router.snapshot.url);
    console.log(this.router.parseUrl(this.router.url).root.segments);
  }

  //adds active class to the nav item
  makeActive(element: HTMLElement) {
    let currentActivePage = document.querySelector(".active");
    currentActivePage!.ariaCurrent = "false";
    currentActivePage!.classList.remove("active");
    // console.log(currentActivePage); TODO:Remove

    // console.log(element); TODO:Remove
    element.classList.add("active");
    element.ariaCurrent = "page";
  }
}
