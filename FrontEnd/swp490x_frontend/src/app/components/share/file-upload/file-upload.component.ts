import { Component, EventEmitter, Output } from '@angular/core';
import { TextMessage } from 'src/app/interface/text-message';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() hasSrcFile: EventEmitter<string> = new EventEmitter<string>();
  @Output() hasFileName: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _httpService: HttpService) {}

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.hasFileName.emit(file.name);
      const url = '/file/upload';
      this._httpService.uploadFile<TextMessage>(url, file).subscribe((res) => {
        if (res) {
          this.hasSrcFile.emit(res.info);
        }
      });
    }
  }
}
