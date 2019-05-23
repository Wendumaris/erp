
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PmtBooking, ApiResponse } from '../../../models';
import { PmtBookings } from '../../../providers';

@Component({
  selector: 'app-pmt-booking-detail',
  templateUrl: './pmt-booking-detail.component.html',
})
export class PmtBookingDetailComponent implements OnInit {

  record: PmtBooking;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public pmtBookings: PmtBookings) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pmtBookings.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['pmt-booking/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`pmt-booking/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
