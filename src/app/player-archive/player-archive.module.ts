import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ContainerWrapperModule } from '../container-wrapper/container-wrapper.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    PlayerInfoComponent,
    PlayerDetailsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerWrapperModule
  ]
})
export class PlayerArchiveModule {
}
