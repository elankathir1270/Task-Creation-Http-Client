import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './utility/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ErrorIndicatorComponent } from './utility/error-indicator/error-indicator.component';



@NgModule({
  declarations: [
    LoaderComponent,
    ErrorIndicatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports : [
    LoaderComponent,
    ErrorIndicatorComponent,
    FormsModule
  ]
})
export class SharedModule { }
