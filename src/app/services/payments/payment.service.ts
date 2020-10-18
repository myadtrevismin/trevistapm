import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Payment } from 'src/app/models/payments/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private firestore: AngularFirestore) {}

  // tslint:disable-next-line: typedef
  getPayments() {
    return this.firestore.collection('payments').snapshotChanges();
  }

  // tslint:disable-next-line: typedef
  savePayment(payment: Payment) {
    delete payment.id;
    return this.firestore.collection('payments').add(payment);
  }

  // tslint:disable-next-line: typedef
  updatePayment(payment: Payment) {
    const payId = payment.id;
    delete payment.id;
    return this.firestore.doc('payments/' + payId).update(payment);
  }

  // tslint:disable-next-line: typedef
  deletePayment(projectId: string) {
  }
}
