import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgQuillTexComponent } from './ng-quill-tex.component';
import { QuillInitializeService } from './services/quillInitialize.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [NgQuillTexComponent],
  imports: [FormsModule,
            ReactiveFormsModule,
            QuillModule.forRoot(),
            CommonModule],
  providers: [QuillInitializeService],
  exports: [NgQuillTexComponent]
})
export class NgQuillTexModule { }
