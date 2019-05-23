import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
  }

}
