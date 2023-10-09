import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../modals/dialog/dialog.component';
import { Router } from '@angular/router';
import { Feed, Post, PostPerson } from './feed';
import { FeedService } from './feed.service';
import { LoginService } from '../login/login.service';
import { NewPostComponent } from '../modals/newpost/newpost.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feed: Feed;

  public hoveredPerson: PostPerson | null = null;

  public loginStatus = false;

  public userType = '';

  constructor(private feedService: FeedService, private loginService: LoginService, private dialog: MatDialog) {
    this.feed  = {
      posts: []
    };

    this.loginStatus =  this.loginService.loginStatus.getValue();
    this.loginService.loginStatus.subscribe(loginStatus => {
      this.loginStatus = loginStatus
      this.userType = this.loginService.getUserType();
    });
  }


  ngOnInit(): void {
    //this.feed = this.feedService.loadFeed();

    this.feedService.getPosts().subscribe((res: any) => {
      res.content.forEach((_post: any) => {
        const post: Post = {
          barName: _post['key_pub_post']['key_name_pub'],
          barPicture:  _post['key_pub_post']['key_picture_pub'],
          carrousel: [
            {
              picture: _post['key_picture_post'],
              author: _post['key_pub_post']['key_name_pub']
            }
          ],
          people: [
            {
              name: _post['key_pub_post']['key_name_pub'],
              picture:  _post['key_pub_post']['key_picture_pub']
            }
          ]
        };

        this.feed.posts.push(post);
      });

      console.log(res);
    });
    
  }

  addPost() {
    this.dialog.open(NewPostComponent, {
      width: '600px',
      hasBackdrop: false,
      data: {  }
    });
  }
  

  addCheckin() {

  }

  addCheckinTo(postId: string) {

  }
  
}
