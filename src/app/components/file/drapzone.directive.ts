import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[appDrapzone]'
})
export class DrapzoneDirective {

  // constructor(private sanitizer: DomSanitizer) { }

  // @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  // @HostBinding('style.background') private backgroundColor = '#eee';

  // // tslint:disable-next-line: typedef
  // @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.backgroundColor = '#999';
  // }

  // // tslint:disable-next-line: typedef
  // @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.backgroundColor = '#eee';
  // }

  // // tslint:disable-next-line: typedef
  // @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   this.backgroundColor = '#eee';

  //   const files: FileHandle[] = [];
  //   const newLocal = evt.dataTransfer.files;
  //   for (let i = 0; i < newLocal.length; i++) {
  //     const file = evt.dataTransfer.files[i];
  //     const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  //     files.push({ file, url });
  //   }
  //   if (files.length > 0) {
  //     this.files.emit(files);
  //   }
  // }

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  // tslint:disable-next-line: typedef
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // tslint:disable-next-line: typedef
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // tslint:disable-next-line: typedef
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
