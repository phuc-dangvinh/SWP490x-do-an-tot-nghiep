import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  constructor(public toastService: ToastService) {}

  isTemplate(content: string | TemplateRef<any>) {
    return content instanceof TemplateRef;
  }

  showStandard(content: string | TemplateRef<any>, delayTime: number) {
    this.toastService.show(content, {
      delay: delayTime,
    });
  }

  showSuccess(content: string | TemplateRef<any>, delayTime: number) {
    this.toastService.show(content, {
      classname: 'bg-success text-light',
      delay: delayTime,
    });
  }

  showDanger(content: string | TemplateRef<any>, delayTime: number) {
    this.toastService.show(content, {
      classname: 'bg-danger text-light',
      delay: delayTime,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
