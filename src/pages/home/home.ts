import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  location = {lat: 13.90, lng: 100.53};
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  marker = new google.maps.Marker;

  private endPoint = 'http://opendata.oae.go.th:8080/farmer/api/v1/';
  private loginPath = 'authentication';

  loginSubscription: Subscription;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.login();
  }

  private login() {
    const endPoint = this.endPoint + this.loginPath;

    // option 1
    /*
    const login = {
      id: 'train01',
      password: 'oaetrain123'
    };
    const body = JSON.stringify(login);
    */

    // option 2
    const params = new URLSearchParams();
    params.append('id', 'train01');
    params.append('password', 'oaetrain123');

    // นำ params.toString() หรือ body ไปแทนค่าหลัง ',' ด้วย

    // ถ้าทั้ง 2 option ไม่สามารถ login ได้ น่าจะเป็นที่ตัวแปรที่ส่งไปไม่ครบ

    this.loginSubscription = this.http.post(endPoint, params.toString())
      .subscribe((res) => {
        console.log('res : ', res);
        this.loginSubscription.unsubscribe();
      });
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 5,
      center: this.location,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#3f110b'}]
        }
      ]
    });

    // Marker
    this.marker = new google.maps.Marker({position: this.location, map: this.map});

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
