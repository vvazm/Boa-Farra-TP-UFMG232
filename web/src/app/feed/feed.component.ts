import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { Feed, PostPerson } from './feed';
import { FeedService } from './feed.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {


  constructor(private feedService: FeedService, private loginService: LoginService) {
  }


  ngOnInit(): void {
  }
}
