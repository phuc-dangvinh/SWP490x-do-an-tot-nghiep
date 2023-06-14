import { Component } from '@angular/core';
import { FileUploadComponent } from 'src/app/components/share/file-upload/file-upload.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends FileUploadComponent {

}