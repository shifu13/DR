import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr-api.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {
  
  photos: any[] = [];
  
  constructor(private flickrService: FlickrService) {
    this.photos = [];
  }

  ngOnInit(): void {
    this.flickrService.getCat()
      .toPromise() //would be better to use observable, so its possible to cancel event.
      .then(res => {
        this.photos = res;
        console.log(this.photos);
      });
  }
}