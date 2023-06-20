import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
})
export class PagingComponent {
  @Input() data: any[] = [];
  @Input() pageSize: number = 1;
  public numberPages: number = 1;
}
