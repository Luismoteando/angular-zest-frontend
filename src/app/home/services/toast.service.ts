import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  showInfo(content: string) {
    this.show(content, {
      delay: 2000,
      autohide: true,
      headertext: 'Info'
    });
  }

  showSuccess(content: string) {
    this.show(content, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'OK'
    });
  }

  showError(content: string) {
    this.show(content, {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Error'
    });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
