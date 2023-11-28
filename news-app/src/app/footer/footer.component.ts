import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
 
  /**
   *
   */
  searchForm: FormGroup ;
  data : any;
  constructor(private restService : RestService, private router: Router, private formBuilder: FormBuilder, 
    private elementRef: ElementRef ) {
    this.searchForm = this.formBuilder.group({
      formData: ['', Validators.required] // formData is the form control for the input field
    });

    this.restService.getScrollSubject().subscribe(() => {
      this.scrollToTextField();
    });
   
  }
  
  search(): void {
    //this.restService.sharedData = this.data;
    this.restService.sharedData = this.searchForm.get('formData')?.value;
    //console.log(this.data);
    //console.log(this.restService.sharedData);
    this.router.navigate(['search']);
  }

  searchData(term:string): void {
    //this.restService.sharedData = this.data;
    this.restService.sharedData = term;
    //console.log(term);
    //console.log(this.restService.sharedData);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['search']);
    
  }

  scrollToTextField(): void {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.elementRef.nativeElement.focus();
  }

}
