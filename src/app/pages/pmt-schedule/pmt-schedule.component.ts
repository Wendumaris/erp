import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';
import { PmtSchedule, ApiResponse, SelectOption } from '../../models';
import { PmtSchedules, PmtRoutes, Vehicles } from '../../providers';


@Component({
  selector: 'app-pmt-schedule',
  templateUrl: './pmt-schedule.component.html',
  styleUrls: ['./pmt-schedule.component.scss']
})
export class PmtScheduleComponent implements OnInit {

  addForm: FormGroup;
  searchForm: FormGroup;
  currentRecords: Array<PmtSchedule> = [];
  pmtRouteOptions: Array<SelectOption>;
  vehicleOptions: Array<SelectOption>;
  loading = false;

  constructor(
    private vehicles: Vehicles,
    public pmtSchedules: PmtSchedules,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private pmtRoutes: PmtRoutes) {
      this.currentRecords = this.pmtSchedules.query();

      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });

      this.addForm = this.formBuilder.group({
        vehicle_id: ['', Validators.required],
        pmt_route_id: ['', Validators.required],
        departure_date: ['', Validators.required],
        // schedule_status: ['', Validators.required],
        is_reservable: [null, Validators.required],
      });

    }

    ngOnInit() {
      this.getPmtRouteOptions();
      this.getVehicleOptions();
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.pmtSchedules.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.pmtSchedules.query();
          this.timedAlert('Response', `${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.timedAlert('Response', err.message);
      });
    }

    async getPmtRouteOptions() {
      // const result = this.pmtRoutes.query();
      const res = await this.pmtRoutes.recordRetrieve();
      if (res.payload.length > 0) {
        this.pmtRouteOptions = res.payload.map(item => ({ id: item.id, text: item.name }));
      }
      console.log(res);
      return;
    }

    async getVehicleOptions() {
      // const result = this.vehicles.query();
      const res = await this.vehicles.recordRetrieve();
      if (res.payload.length > 0) {
        this.vehicleOptions = res.payload.map(item => ({ id: item.id, text: item.name }));
      }
      console.log(res);
      return;
    }

    recordAdd(): void {
    }

    recordEdit(record: any): void {
    }

    recordDelete(record) {
      console.log(record.id);
    }

  timedAlert(title, message): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: title,
        text: message,
        time: 2000
      }
    });
  }
}
