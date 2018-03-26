import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesServise} from '../shared/services/categories.servise';
import {EventsService} from '../shared/services/events.service';
import {Observable} from 'rxjs/Observable';
import {WFMEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';
import {Bill} from '../shared/models/bill.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: WFMEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesServise,
              private eventService: EventsService) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
    this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], WFMEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];

        this.isLoaded = true;
    });
  }



  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat))/ cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
     return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {

    const persent = this.getPercent(cat);
    return persent < 60 ? 'success' : persent >= 100 ? 'danger' : 'warning';

  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }



}
