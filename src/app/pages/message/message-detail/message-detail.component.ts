
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ApiResponse } from '../../../models';
import { Messages } from '../../../providers';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
})
export class MessageDetailComponent implements OnInit {

  record: Message;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public messages: Messages) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.messages.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['message/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`message/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
