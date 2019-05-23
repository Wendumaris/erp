
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PmtReservation, ApiResponse } from '../../../models';
import { PmtReservations } from '../../../providers';

@Component({
  selector: 'app-pmt-reservation-detail',
  templateUrl: './pmt-reservation-detail.component.html',
})
export class PmtReservationDetailComponent implements OnInit {

  record: PmtReservation;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public pmtReservations: PmtReservations) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pmtReservations.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['pmt-reservation/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`pmt-reservation/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
