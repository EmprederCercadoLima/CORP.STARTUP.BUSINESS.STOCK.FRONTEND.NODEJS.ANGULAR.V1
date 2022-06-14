import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public pageTile = '';
  public observablePageTitle : Subscription;

  constructor(private readonly router: Router) {
    this.observablePageTitle = this.generateArgRouter()
    .subscribe(
      (sucess: any) => {
        this.pageTile = sucess.title
      },
      (error) => {
        console.error("NgxBreadcrumbsComponent::constructor::error", error);
      }
    )
  }

  generateArgRouter () {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild == null),
      pluck('snapshot'),
      pluck('data')
    )
  }

  ngOnDestroy(): void {
    this.observablePageTitle.unsubscribe();
  }



}
