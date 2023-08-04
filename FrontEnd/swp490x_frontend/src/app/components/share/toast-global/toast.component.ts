import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from 'src/app/interface/toast';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  public toasts: Toast[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private _toastService: ToastService) {}

  ngOnInit(): void {
    this._toastService.toasts$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.toasts = res;
      });
  }

  public remove(toast: Toast) {
    this._toastService.remove(toast);
  }

  ngOnDestroy(): void {
    this._toastService.clear();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
