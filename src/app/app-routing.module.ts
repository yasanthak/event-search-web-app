import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  EventListComponent,
  EventsDetailsComponent,
  EventListResolver,
  EventResolver

} from './features/index';

const routes: Routes = [
  { path: 'events', component: EventListComponent, resolve: { events: EventListResolver } },
  { path: 'events/:id', component: EventsDetailsComponent, resolve: { event: EventResolver } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
