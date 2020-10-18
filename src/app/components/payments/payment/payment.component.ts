import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payments/payment';
import { PaymodalComponent } from '../paymodal/paymodal.component';
import { PaymentService } from 'src/app/services/payments/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, private paymentService: PaymentService) { }

  dataSource: MatTableDataSource<Payment>;
  displayedColumns: string[] = ['amount', 'payDate', 'paymentType', 'paidBy', 'notes', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadPayments();
  }

  addPayment(): void{
    const dialogRef = this.dialog.open(PaymodalComponent, {
      width: '300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null && result.valid){
        this.paymentService.savePayment(result.value);
      }
    });
  }

  loadPayments(): void{
    this.paymentService.getPayments().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Payment)
        } ;
      });
      console.log(this.dataSource.data);
    });
  }

  edit(row): void{
    const dialogRef = this.dialog.open(PaymodalComponent, {
      width: '300px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined && result !== null && result.valid){
        this.paymentService.updatePayment(result.value);
      }
    });
  }

  deleteDocument(row): void{
  }

}
