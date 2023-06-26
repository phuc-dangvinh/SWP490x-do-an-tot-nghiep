import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  // imports: [NgbTooltipModule],
  // standalone: true,
})
export class ToastComponent implements OnDestroy {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: string | TemplateRef<any>) {
    return toast instanceof TemplateRef;
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  showDanger(dangerTpl: string | TemplateRef<any>) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
