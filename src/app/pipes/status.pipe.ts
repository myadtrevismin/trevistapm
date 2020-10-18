import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(taskList: any, taskName: string): any[] {
    if (taskList) {
      return taskList.filter((listing: any) => listing.status === taskName);
    }
  }
}
