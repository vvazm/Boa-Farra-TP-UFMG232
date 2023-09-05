import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feed } from './feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor() {

  }

  loadFeed(): Feed {
    const feed: Feed = {
      highlight: undefined,
      posts: [
      ]
    }

    return feed;
  }
  
}
