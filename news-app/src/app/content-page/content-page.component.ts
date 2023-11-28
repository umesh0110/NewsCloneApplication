import { Component } from '@angular/core';
import { newsData } from '../models/news.model';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent {
  newsDetails:newsData[] = [];
  contentDetail : newsData = new newsData();
  displayAuthors: boolean = false;
  constructor(private restService : RestService , private router: Router) {
    
  }

  ngOnInit(): void {
    this.contentDetail = this.restService.newsContent;
    this.displayAuthors = this.contentDetail?.authors?.length > 0;
    this.newsDetails = this.restService.sharedHeadlines;
    //this.fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    //console.log('ngOnInit called');
  }
  setContentData(content: newsData) {
    this.restService.newsContent = content;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['content']);
    //window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
}
