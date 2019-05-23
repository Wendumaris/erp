
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle, ApiResponse } from '../../../models';
import { Vehicles } from '../../../providers';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
})
export class VehicleDetailComponent implements OnInit {

  record: Vehicle;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public vehicles: Vehicles) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.vehicles.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['vehicle/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`vehicle/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
