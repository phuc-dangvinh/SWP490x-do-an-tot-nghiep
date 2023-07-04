import {
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Input() placeHolder: string = 'Search...';
  @Input() width: number = 20;
  public searchForm = this.formBuilder.group({
    keyword: [''],
  });
  @Output() clickSearch = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  public onClick() {
    this.clickSearch.emit(this.searchForm.value.keyword);
  }
}
