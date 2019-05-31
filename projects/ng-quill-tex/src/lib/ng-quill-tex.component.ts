import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { debounceTime } from 'rxjs/operators';
import { QuillInitializeService } from './services/quillInitialize.service';
import BlotFormatter from 'quill-blot-formatter';
import { ImageUpload } from 'quill-image-upload';
import { FormGroup, FormControl } from '@angular/forms';
import { QuillImageUpload } from './models/quill-image-upload';

@Component({
  selector: 'ng-quill-tex',
  templateUrl: './ng-quill-tex.component.html',
  styles: []
})
export class NgQuillTexComponent implements OnInit, QuillImageUpload {

  @Input() modules;
  @Input() _imageUrl;
  @Output() textChanged = new EventEmitter<any>();
  @Output() fileUploaded = new EventEmitter<QuillImageUpload>();
  @Input() group?: FormGroup;
  @Input() controlName?: FormControl;
  @Input() content?: any;
  @Input() editorContent: any;

  quillEditorRef;

  @ViewChild('quillEditior') quillEditior: QuillEditorComponent;
  constructor(private quillInitializeService: QuillInitializeService,
    private cd: ChangeDetectorRef) {

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
        this.onfileUploaded(file);
      }
    };

    setTimeout(() => {
      this.quillEditior
        .onContentChanged
        .pipe(
          debounceTime(400),
        )
        .subscribe((data) => {
          this.onTextChanged({ 'html': data.html, 'delta': data.content.ops });
        });
    }, 0);
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    if (this.content) {
      console.log('set contentdd');
      setTimeout(() => {
        this.editorContent = this.content;
        this.cd.markForCheck();
      }, 10);

      // this.quillEditorRef.content = this.content;
      // this.quillEditorRef.content(this.content);
    }
  }

  onTextChanged(html: any) {
    this.textChanged.emit(html);
  }

  onfileUploaded(file: File): void {
    const quillImageUpload: QuillImageUpload = { file: file, setImage: this.setImage };
    quillImageUpload.file = file;
    this.fileUploaded.emit(quillImageUpload);
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  @Input()
  set imageUrl(fileName: string) {
    if (fileName) {
      this.displayImage(this.quillEditorRef, fileName);
    }
    this._imageUrl = fileName;
  }


  setImage = (imageUrl: string) => {
    this.displayImage(this.quillEditorRef, imageUrl);
  }


  displayImage(quillEditorRef, imageUrl) {
    const range = quillEditorRef.getSelection();
    const imageIndex = range.index;
    quillEditorRef.insertEmbed(imageIndex, 'image', imageUrl);
  }
}
