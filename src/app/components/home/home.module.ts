import { NgModule } from '@angular/core';
import { HomeComponent } from './container/home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePrimeNgModule } from './home-primeng.module';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    HomePrimeNgModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    CommonModule
  ],
  declarations: [
    HomeListComponent,
    HomeComponent,
    HomeDetailsComponent,
    HomeFormComponent
  ],
  exports: [HomeComponent]
})
export class HomeModule {}
