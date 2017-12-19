import { Component, OnInit, ViewChild } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm: NgForm;
  userId: string;
  websites = [{}];
  name: string;
  description: string;
  website: any;

  constructor(private webService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
        }
      );
    this.webService.findWebsitesByUser(this.userId)
      .subscribe(
        (websites: any) => {
          this.websites = websites;
        }
      );

  }

  create() {
    console.log('inside web of web new');
    this.name = this.websiteForm.value.name;
    this.description = this.websiteForm.value.description;
    const website = {
      name: this.name,
      description: this.description
    }
    console.log(website.name);
    console.log(this.websiteForm.value.description);
    this.website = this.webService.createWebsite(this.userId, website)
      .subscribe(
        (new_website: any) => {
          this.router.navigate(['user/' + this.userId, 'website']);
        }
      );
  }

}
