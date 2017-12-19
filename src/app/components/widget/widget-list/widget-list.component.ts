import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: string;
  widgets = [{}];
  wid: string;
  pid: string;
  user: any;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private widgetService: WidgetService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
          this.pid = params['pid'];
        }
      );
    this.widgetService.findWidgetsByPageId(this.pid)
      .subscribe(
        (widgets: any) => {
          this.widgets = widgets;
        }
      );
  }

  updatePosition(event: Object) {
    this.widgetService.updateWidgetPosition(this.pid, event['startIndex'], event['endIndex'])
      .subscribe((data) => {
        if (data && data.success === true) {
          console.log('success');
        }else {
          console.log('error in updating position');
        }
      });
  }

}
