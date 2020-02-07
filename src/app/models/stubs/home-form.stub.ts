import { Component } from '@angular/core';
import { HomeFormComponent } from '../../components/home/home-form/home-form.component';

@Component({
  selector: 'app-home-form',
  template: '',
  providers: [
    {
      provide: HomeFormComponent,
      useClass: HomeFormStubComponent
    }
  ]
})
export class HomeFormStubComponent {}
