import { Component, OnInit, NgZone, ChangeDetectorRef, ApplicationRef, 
        ViewChild, ElementRef} from '@angular/core';
import { FlickrService } from '../services/flickr-api.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
  
export class SearchComponent implements OnInit {
  keyupSub: Subscription; //not a const, bcs then you cant unsubscripe, when you "destroy it"

  @ViewChild('input') inputElRef: ElementRef;

  search: any[] = [];

  constructor(private flickrService: FlickrService, private ngzone: NgZone, private cdref: ChangeDetectorRef,
    private appref: ApplicationRef) {
    
    this.search = [];
  }

  //Debounce method
  ngAfterViewInit() {
    this.ngzone.run( () => { //
      this.keyupSub = fromEvent(this.inputElRef.nativeElement, 'keyup').pipe(
        debounceTime(1000),
        distinctUntilChanged(), //only emit when the current value is different than last
        tap(() => { //used to observe the next input
          this.searchImg(this.inputElRef.nativeElement.value);
        })
      ).subscribe() //stop receiving notifications
        
    });
  }
  
  //Lifecycle hook, used to cleanup, when an instance is destroyed
  ngOnDestroy() {
    this.keyupSub.unsubscribe(); //stopping to do event
  }

  ngOnInit(): void {
  }

  //SearchImg method
  searchImg(value: any) {
    const keyword = value.toLowerCase();
    this.flickrService.search(keyword)
      .toPromise()
      .then(res=> {
        this.search = res;
        console.log(this.search);
      });
  }

  /* searchImg(event: any) {
    const keyword = event?.target.value.toLowerCase();
    this.flickrService.search(keyword)
      .toPromise()
      .then(res=> {
        this.search = res;
        console.log(this.search);
      });
  } */
}
