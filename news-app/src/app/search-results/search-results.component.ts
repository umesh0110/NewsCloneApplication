import { Component } from '@angular/core';
import { newsData } from '../models/news.model';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  newsDetails:newsData[] = [];
  sportsDetails:newsData[] = [];
  constructor(private restService : RestService, private router: Router) {
    
  }

  ngOnInit(): void {
    //this.fetchData();

     
    this.fetchSearchData();
    this.newsDetails = this.restService.sharedHeadlines;
    //console.log('ngOnInit called');
    
  }
  // fetchData() {
  //   this.restService.getNews().subscribe((response) => {
  //     this.newsDetails = response.articles.results;

  //     //console.log(response);
  //     //console.log("***** data*****")
  //     //console.log(this.newsDetails);
  //   });
  // }

  fetchSearchData() {
    this.restService.getSearchResults().subscribe((response) => {
      this.sportsDetails = response.articles.results.slice(0, 8);;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  setContentData(content: newsData) {
    this.restService.newsContent = content;
    this.router.navigate(['content']);
    //window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

}
