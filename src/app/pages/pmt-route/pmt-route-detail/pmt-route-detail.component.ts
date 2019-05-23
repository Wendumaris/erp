
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PmtRoute, ApiResponse } from '../../../models';
import { PmtRoutes } from '../../../providers';

@Component({
  selector: 'app-pmt-route-detail',
  templateUrl: './pmt-route-detail.component.html',
})
export class PmtRouteDetailComponent implements OnInit {

  record: PmtRoute;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public pmtRoutes: PmtRoutes) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pmtRoutes.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['pmt-route/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`pmt-route/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
