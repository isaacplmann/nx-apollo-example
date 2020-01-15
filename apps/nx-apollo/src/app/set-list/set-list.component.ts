import { Component } from '@angular/core';
import { Set } from '@nx-apollo-example/api-interfaces';
import { Observable } from 'rxjs';
import { SetService } from '../set.service';

@Component({
  selector: 'nx-apollo-example-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent {
  sets$: Observable<Set[]>;

  constructor(private setService: SetService) {
    this.sets$ = this.setService.sets$;
  }
}
