import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../interface/toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts$: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  public toasts: Toast[] = [];

  // public isTemplate(content: string | TemplateRef<any>) {
  //   return content instanceof TemplateRef;
  // }

  public add(toast: Toast) {
    this.toasts.push(toast);
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
