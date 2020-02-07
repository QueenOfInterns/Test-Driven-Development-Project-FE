import { Component } from '@angular/core';
import { HomeListComponent } from '../../components/home/home-list/home-list.component';

@Component({
  selector: 'app-home-list',
  template: '',
  providers: [
    {
      provide: HomeListComponent,
      useClass: HomeListStubComponent
    }
  ]
})
export class HomeListStubComponent {}
