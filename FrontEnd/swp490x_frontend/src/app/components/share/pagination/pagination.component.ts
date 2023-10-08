import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
  @Input() collection: any[] = [];
  @Input() pageSize: number = 6;
  @Input() pageSizeOption: number[] = [4, 6, 8, 10, 12];
  @Input() maxSize: number = 10;
  @Output() selectPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>();

  public onPageChange(page: number) {
    this.selectPage.emit(page);
  }
  public onPageSizeChange() {
    this.changeSize.emit(this.pageSize);
  }
}
