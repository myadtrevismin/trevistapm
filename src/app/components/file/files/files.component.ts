import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { FileHandle } from '../drapzone.directive';
import {FileService} from 'src/app/services/files/file.service';
import {FileModel} from 'src/app/models/files/file-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, AfterViewInit {

  constructor(private afStorage: AngularFireStorage, private fileService: FileService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  files: any[] = [];
  imagepath;
  IsUpload = false;
  percentage;
  snapshot: Observable<any>;
  fileurls = [];
  savedFiles;
  dataSource: MatTableDataSource<FileModel>;
  displayedColumns = ['sno', 'name', 'created', 'uploadedBy', 'download'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadFiles();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // filesDropped(files: FileHandle[]): void {
  //   this.files = files;
  // }

  // // tslint:disable-next-line: typedef
  // fileBrowse(files){
  //   this.files = files;
  // }

  // tslint:disable-next-line: typedef
  public dropped(files) {
    this.prepareFilesList(files);
  }

  // tslint:disable-next-line: typedef
  public fileBrowse(files){
    this.prepareFilesList(files);
  }


  // tslint:disable-next-line: typedef
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagepath = e.target.result;
    };
    reader.readAsDataURL(files[0]);
    this.uploadFilesSimulator(0);
  }

  // tslint:disable-next-line: typedef
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  // tslint:disable-next-line: typedef
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // tslint:disable-next-line: typedef
  onUpload(){
    Array.from(this.files).forEach((element: File) => {
      const path = `property/${Date.now()}_${element.name}`;
      const ref = this.afStorage.ref(path);
      const task: AngularFireUploadTask = this.afStorage.upload(path, element);
      this.percentage = task.percentageChanges();

      this.snapshot = task.snapshotChanges().pipe(
        tap(console.log),
        finalize( async () =>  {
          const download: Promise<any> = await ref.getDownloadURL().toPromise();
          this.fileurls.push({ downloadURL: download, path });
          const objectvalue = {
            createdBy: null,
            createdDt: new Date(),
            fileName: element.name,
            filedata: this.fileurls,
          };
          this.fileService.saveFile(objectvalue);
        }),
      );
      this.snapshot.subscribe(x => console.log(x));
    });
    this.IsUpload = false;
    this.files = [];
  }

  // tslint:disable-next-line: typedef
  loadFiles(){
    this.fileService.getFiles().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as FileModel)
        } ;
      });
    });
  }

  download(row): void {
    console.log(row);
    window.open(row.filedata[0].downloadURL);
  }

}
