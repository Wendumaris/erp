
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff, ApiResponse } from '../../../models';
import { Staffs } from '../../../providers';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
})
export class StaffDetailComponent implements OnInit {

  record: Staff;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public staffs: Staffs) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.staffs.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
