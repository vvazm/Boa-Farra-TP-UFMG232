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
        {
          barName: 'Pingucos e Alcolatras Não Anonimos Bar',
          barPicture: '1',
          carrousel: [
          ],
          people: [
          ]
        },
          {
            barName: 'Copo Sujo Ultra Beer',
            barPicture: '2',
            carrousel: [
            ]
          }
      ]
    }

    return feed;
  }
  
}
