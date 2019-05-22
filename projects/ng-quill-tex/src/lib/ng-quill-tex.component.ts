import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { debounceTime } from 'rxjs/operators';
import { QuillInitializeService } from './services/quillInitialize.service';
import BlotFormatter from 'quill-blot-formatter';
import { ImageUpload } from 'quill-image-upload';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ng-quill-tex',
  templateUrl: './ng-quill-tex.component.html',
  styles: []
})
export class NgQuillTexComponent implements OnInit {

  @Input() modules;
  @Input() _imageUrl;
  @Output() textChanged = new EventEmitter<any>();
  @Output() fileuploaded = new EventEmitter<any>();
  @Input() group?: FormGroup;
  @Input() controlName?: string;

  quillEditorRef;

  @ViewChild('quillEditior') quillEditior: QuillEditorComponent;
  constructor(private quillInitializeService: QuillInitializeService) {

    this.modules = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'code'],
          [{ 'color': [] }],
        ]
      }
    };

    Quill.register('modules/imageUpload', ImageUpload);
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  ngOnInit() {

    this.modules.imageUpload = {
      customUploader: (file) => {
        this.onfileuploaded(file);
      }
    };

    setTimeout(() => {
      this.quillEditior
        .onContentChanged
        .pipe(
          debounceTime(400),
        )
        .subscribe((data) => {
          this.onTextChanged({ 'html': data.html, 'delta': data.content.ops});
        });
    }, 0);
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
  }

  onTextChanged(html: any) {
    this.textChanged.emit(html);
  }

  onfileuploaded(file: File): void {
    this.fileuploaded.emit(file);
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  @Input()
  set imageUrl(fileName: string) {

    if (fileName && (this._imageUrl !== fileName)) {
      const range = this.quillEditorRef.getSelection();
      const imageIndex = range.index;
      this.quillEditorRef.insertEmbed(imageIndex, 'image', fileName);
      const newRange = this.quillEditorRef.getSelection();
      const newimageIndex = newRange.index;
      this.quillEditorRef.setSelection(newimageIndex, Quill.sources.SILENT);
    }
    this._imageUrl = fileName;
  }



}
