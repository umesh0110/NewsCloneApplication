import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { newsData } from '../models/news.model';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  newsDetails: newsData[] = [];
  sportsDetails: newsData[] = [];
  techDetails: newsData[] = [];
  opinionDetails: newsData[] = [];
  moviesDetails: newsData[] = [];
  scienceDetails: newsData[] = [];
  styleDetails: newsData[] = [];
  politicsDetails: newsData[] = [];
  societyDetails: newsData[] = [];
  recentDetails: newsData[] = [];
  recentHeadline: newsData[] = [];
  newsHeadline: newsData[] = [];
  healthDetails: any;

  constructor(private restService: RestService, private router: Router) {

  }

  ngOnInit(): void {

    this.fetchData();
    const fetchFunctions = [
      this.fetchRecentData,
      this.fetchHealthDetails,
      this.fetchMoviesData,
      this.fetchTechData,
      this.fetchSportsData,
      this.fetchStyleData,
      this.fetchOpinionData,
      this.fetchPoliticsData,
      this.fetchScienceData,
      this.fetchSocietyData
    ];

    let delay = 0;
    for (const fetchFunction of fetchFunctions) {
      setTimeout(() => {
        fetchFunction.call(this);
      }, delay);
      delay += 100;
    }

    // this.fetchData();
    // setTimeout(() => {
    //   this.fetchSportsData();
    // }, 500);
    // setTimeout(() => {
    //   this.fetchTechData();
    // }, 1000);
    // setTimeout(() => {
    //   this.fetchOpinionData();
    // }, 1500);
    // setTimeout(() => {
    //   this.fetchMoviesData();
    // }, 2000);
    // setTimeout(() => {
    //   this.fetchScienceData();
    // }, 2500);
    // setTimeout(() => {
    //   this.fetchStyleData();
    // }, 3000);
    // setTimeout(() => {
    //   this.fetchPoliticsData();
    // }, 3500);
    // setTimeout(() => {
    //   this.fetchSocietyData();
    // }, 4000);
    // setTimeout(() => {
    //   this.fetchRecentData();
    // }, 4500);
    // setTimeout(() => {
    //   this.fetchHealthDetails();
    // }, 5000);


  }
  fetchData() {
    this.restService.getNews().subscribe((response) => {

      this.newsDetails = response?.articles.results.slice(0, 7);
      this.newsHeadline = response?.articles.results.slice(8, 14);
      this.restService.sharedHeadlines = response?.articles.results;
    });
  }

  fetchSportsData() {
    this.restService.getCategoryNews("sports").subscribe((response) => {
      this.sportsDetails = response?.articles.results.slice(0, 5);;
    });
  }

  fetchTechData() {
    this.restService.getCategoryNews("tech").subscribe((response) => {
      this.techDetails = response?.articles.results.slice(0, 5); // Adjust the slicing as needed.
    });
  }

  fetchOpinionData() {
    this.restService.getCategoryNews("opinion").subscribe((response) => {
      this.opinionDetails = response?.articles.results.slice(0, 5);;
    });
  }

  fetchMoviesData() {
    this.restService.getCategoryNews("movies").subscribe((response) => {
      this.moviesDetails = response?.articles.results.slice(0, 5);;
    });
  }
  fetchScienceData() {
    this.restService.getCategoryNews("science").subscribe((response) => {
      this.scienceDetails = response?.articles.results.slice(0, 5);;
    });
  }
  fetchStyleData() {
    this.restService.getCategoryNews("style").subscribe((response) => {
      this.styleDetails = response?.articles.results.slice(0, 5);;
    });
  }
  fetchPoliticsData() {
    this.restService.getCategoryNews("politics").subscribe((response) => {
      this.politicsDetails = response?.articles.results.slice(0, 5);;
    });
  }
  fetchSocietyData() {
    this.restService.getCategoryNews("society").subscribe((response) => {
      this.societyDetails = response?.articles.results.slice(0, 5);;
    });
  }
  //  fetchRecentData() {
  //    this.restService.getRecentActivity().subscribe((response) => {
  //      this.recentDetails = response?.recentActivityArticles.activity.slice(0, 5);
  //      this.recentHeadline = response?.recentActivityArticles.activity.slice(5, 7);;
  //    });
  //  }

  fetchRecentData() {
    this.restService.getCategoryNews("recent").subscribe((response) => {
      //console.log(response);
      this.recentDetails = response?.articles.results.slice(0, 5);
      this.recentHeadline = response?.articles.results.slice(5, 7);;
    });
  }
  fetchHealthDetails() {
    this.restService.getCategoryNews("health").subscribe((response) => {
      this.healthDetails = response?.articles.results.slice(0, 5);
    });
  }

  searchData(term: string): void {

    this.restService.sharedData = term;
    //console.log(term);
    //console.log(this.restService.sharedData);
    //   this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //     return false;
    // }
    // this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['search']);

  }
  setContentData(content: newsData) {
    this.restService.newsContent = content;
    this.router.navigate(['content']);
  }

}
