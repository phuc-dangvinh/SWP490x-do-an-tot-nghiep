import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../interface/toast';
import { BehaviorSubject } from 'rxjs';
import { EToastClass } from '../const/EToastClass';
import { EToastMessage } from '../const/EToastMessage';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts$: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  public toasts: Toast[] = [];

  public show(toast: Toast) {
    this.toasts.push(toast);
    this.toasts$.next(this.toasts);
  }

  public showMessage(
    type: EToastClass,
    content: EToastMessage,
    delay: number = 3000
  ) {
    this.toasts.push({
      content: content,
      classname: type,
      delay: delay,
    });
    this.toasts$.next(this.toasts);
  }

  public remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
    this.toasts$.next(this.toasts);
  }

  public clear() {
    this.toasts.splice(0, this.toasts.length);
    this.toasts$.next(this.toasts);
  }
}
