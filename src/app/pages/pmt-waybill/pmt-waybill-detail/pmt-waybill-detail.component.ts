
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PmtWaybill, ApiResponse } from '../../../models';
import { PmtWaybills } from '../../../providers';

@Component({
  selector: 'app-pmt-waybill-detail',
  templateUrl: './pmt-waybill-detail.component.html',
})
export class PmtWaybillDetailComponent implements OnInit {

  record: PmtWaybill;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public pmtWaybills: PmtWaybills) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pmtWaybills.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['pmt-waybill/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`pmt-waybill/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
