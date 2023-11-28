import { Component, Output, EventEmitter, Inject  } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private restService : RestService, private router: Router, @Inject(DOCUMENT) private document: Document) {
   
  }

  
 
  searchData(term:string): void {

    this.restService.sharedData = term;
    //console.log(term);
    //console.log(this.restService.sharedData);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['search']);
    
  }


  onIconClick(): void {
    this.restService.scrollRequested();
  }

  setLanguage(langauge:string, htmlLang:string): void {

    this.restService.language = langauge;  
    this.restService.htmlLang = htmlLang;
    this.document.documentElement.lang = htmlLang;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);  
  }

}
