import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

//Making interface which is similar to the required information for photo image URL
interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
}

//Making interface, which is similar to the objects for the API
interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

export interface Photo {
  url: string;
}

@Injectable({ providedIn: 'root' })
  
export class FlickrService {
  constructor(private readonly http: HttpClient) {}

  //function for cat
  public getCat(): Observable<Photo[]> { //observables of photo
    const url = 'https://www.flickr.com/services/rest/';
    //httpParams are immutable, and can't be modified
    const params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('api_key', environment.flickr.key)
      .set('tags', 'cats')
      .set('format', 'json')
      .set('per_page', '9')
      .set('nojsoncallback', '1');
    
    return this.http.get<FlickrOutput>(url, { params }).pipe( //observerables of FLickrOutput with url & params
      map((res: FlickrOutput): Photo[] => {
        return res.photos.photo.map(
          (ph: FlickrPhoto): Photo => ({
            url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`
          }),
        );
      })
    );
  }

  //function for search
  public search(keyword: string): Observable<Photo[]> { //observables of photo
    const url = 'https://www.flickr.com/services/rest/';
    //httpParams are immutable, and can't be modified
    const params = new HttpParams()
      .set('method', 'flickr.photos.search')
      .set('api_key', environment.flickr.key)
      .set('text', keyword)
      .set('format', 'json')
      .set('nojsoncallback', '1');
    
    return this.http.get<FlickrOutput>(url, { params }).pipe( //observerables of FLickrOutput with url & params
      map((res: FlickrOutput): Photo[] => {
        return res.photos.photo.map(
          (ph: FlickrPhoto): Photo => ({
            url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`
          }),
        );
      })
    );
  }
}