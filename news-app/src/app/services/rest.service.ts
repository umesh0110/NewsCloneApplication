import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newsData } from '../models/news.model';
import { Subject } from 'rxjs';

export const apiBaseUrl = "https://localhost:7136/News/";
//export const apiBaseUrl = "https://localhost:44345/News/";
//export const apiBaseUrl = "https://wilpnewsproj.bsite.net/news/";

@Injectable({
  providedIn: 'root'
})

export class RestService {
  /**
   *
   */
  ngOnInit(){
    // //console.log("Service - ngonint");
    // this.setIPAddress();
  }

  private scrollSubject: Subject<void> = new Subject<void>();
  scrollRequested() {
    this.scrollSubject.next();
  }

  getScrollSubject() {
    return this.scrollSubject.asObservable();
  }

  sharedData: string = "";  
  sharedHeadlines:newsData[] = [];
  language: string = "eng";
  htmlLang:string ="en";
  showLanguage: boolean = true;
  newsContent: newsData = new newsData();
  ipString : string ="0.0.0.0";
  constructor(private  http: HttpClient) { //console.log("Service - Constructor");
  this.setIPAddress(); }
  getNews() : Observable<any> {
    //const apiUrl ="https://eventregistry.org/api/v1/article/getArticles?resultType=articles&lang=eng&articlesCount=10&apiKey=ba90c5c2-166f-4331-a697-ae56293b7a4f&sourceLocationUri=http://en.wikipedia.org/wiki/India"; //'https://localhost:44376/News';
    //const apiUrl = "https://localhost:44376/News/getList";
    //console.log("IP : "+ this.ipString);
    var httpHeaders = new HttpHeaders({
      'news-app-ip': this.ipString,
      'NEWS-APP-XSRF-HEADER': this.getCSRFToken()
    });
    //console.log(apiBaseUrl+"newsList");
    return this.http.get(apiBaseUrl+"newsList?language="+this.language+"&time="+new Date().getTime(), {headers:httpHeaders});
  }
  
  getCategoryNews(category: any) : Observable<any> {
    var httpHeaders = new HttpHeaders({
      'news-app-ip': this.ipString,
      'NEWS-APP-XSRF-HEADER': this.getCSRFToken()
    });
    return this.http.get(apiBaseUrl+"categoryNewsList?language="+this.language+"&category="+category+"&time="+new Date().getTime(), {headers:httpHeaders});
  }

  // getRecentActivity() : Observable<any> {
  //   return this.http.get(apiBaseUrl+"getRecentActivity&time="+new Date().getTime());
  // }
 
  getSearchResults() : Observable<any> {
    //console.log(this.ipString);
    //console.log(this.getCSRFToken());
    var httpHeaders = new HttpHeaders({
      'news-app-client-IP': this.ipString,
      'NEWS-APP-XSRF-HEADER': this.getCSRFToken()
    });
    ////console.log("headers");
    ////console.log(this.getHeaders());
    return this.http.get(apiBaseUrl+"searchResults?language="+this.language+"&searchString="+this.sharedData+"&time="+new Date().getTime(), {headers:httpHeaders});
  }

  setIPAddress() : void {
   
      this.getIPAddressFromAPI().subscribe((data: any) => {
        this.ipString = data.ip;
        //console.log("**ip call**");
        //console.log(data);
      })
    
    
    
  }

  getIPAddressFromAPI() : Observable<any> {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  getCSRFToken():string{

    let token = document.body.children.namedItem("NEWS-APP-XSRF-FORM")?.getAttribute("value");
    if(token==null|| token==undefined) token = "";
    return token;
  }
}
