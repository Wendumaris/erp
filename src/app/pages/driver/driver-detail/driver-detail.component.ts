
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver, ApiResponse } from '../../../models';
import { Drivers } from '../../../providers';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
})
export class DriverDetailComponent implements OnInit {

  record: Driver;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public drivers: Drivers) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.drivers.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
