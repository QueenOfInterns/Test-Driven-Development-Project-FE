import { Component } from '@angular/core';
import { HomeDetailsComponent } from '../../components/home/home-details/home-details.component';

@Component({
  selector: 'app-home-details',
  template: '',
  providers: [
    {
      provide: HomeDetailsComponent,
      useClass: HomeDetailsStubComponent
    }
  ]
})
export class HomeDetailsStubComponent {}
