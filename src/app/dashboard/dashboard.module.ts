import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared.module';
import { OverviewComponent } from './overview/overview.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRouteModule } from './dashboard-route.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    OverviewComponent,
    StatsComponent,
  ],
  exports : [
    // DashboardComponent,
    // CreateTaskComponent,
    // TaskDetailsComponent,
    SharedModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRouteModule
  ]
})
export class DashboardModule { }
