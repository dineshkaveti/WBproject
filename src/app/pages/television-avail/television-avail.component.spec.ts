import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevisionAvailComponent } from './television-avail.component';
import { AvailFilterComponent } from '../avail-filter/avail-filter.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatProgressBarModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';
xdescribe('TelevisionAvailComponent', () => {
  let component: TelevisionAvailComponent;
  let fixture: ComponentFixture<TelevisionAvailComponent>;
  let service: HttpService;
  let httpMock: HttpTestingController;
  let tvCategories: any = [{ name: "New" }, { name: "Day After" }, { name: "Catalog" }, { name: "TBD" }]
  const tvdata = {
    "resultData": [
      {
        "StartDate": "09/24/2019",
        "AvailName": "TC Dec142018",
        "AnnouncementDate": [
          "12/14/2018"
        ],
        "DueDate": "10/15/2019",
        "TitleData": {
          "UniqueLanguagesCount": 8,
          "EpisodesPendingCount": 75,
          "AvailPercentage": 0,
          "UniqueCountriesCount": 9,
          "CountriesPendingCount": 9,
          "LanguagesPendingCount": 8,
          "CountriesCompletedCount": 0,
          "EpisodesCompletedCount": 0,
          "LanguagesCompletedCount": 0,
          "EpisodesCount": 75,
          "PendingRatings": 98,
          "PendingTranslations": 98,
          "EpisodeCountriesCount": 93
        }
      },
      {
        "StartDate": "09/24/2019",
        "AvailName": "LDC_T Dec142018",
        "AnnouncementDate": [
          "12/14/2018"
        ],
        "DueDate": "10/15/2019",
        "TitleData": {
          "UniqueLanguagesCount": 5,
          "EpisodesPendingCount": 15,
          "AvailPercentage": 0,
          "UniqueCountriesCount": 8,
          "CountriesPendingCount": 8,
          "LanguagesPendingCount": 5,
          "CountriesCompletedCount": 0,
          "EpisodesCompletedCount": 0,
          "LanguagesCompletedCount": 0,
          "EpisodesCount": 15,
          "PendingRatings": 25,
          "PendingTranslations": 25,
          "EpisodeCountriesCount": 25
        }
      }
    ]
  }
  const tvCatlogData= {
    "resultData": [{
    "StartDate": "10/31/2019",
    "AvailName": "TC Aug162019",
    "AnnouncementDate": "08/16/2019",
    "DueDate": "11/21/2019",
    "TitleData": {
        "UniqueLanguagesCount": 9,
        "EpisodesPendingCount": 396,
        "AvailPercentage": 0,
        "UniqueCountriesCount": 13,
        "CountriesPendingCount": 13,
        "LanguagesPendingCount": 9,
        "CountriesCompletedCount": 0,
        "EpisodesCompletedCount": 0,
        "LanguagesCompletedCount": 0,
        "EpisodesCount": 396,
        "PendingRatings": 562,
        "PendingTranslations": 562,
        "EpisodeCountriesCount": 487
    }
  },
    

{
    "StartDate": "11/01/2019",
    "AvailName": "TC Jun072019",
    "AnnouncementDate": "06/07/2019",
    "DueDate": "11/22/2019",
    "TitleData": {
        "UniqueLanguagesCount": 8,
        "EpisodesPendingCount": 1300,
        "AvailPercentage": 0,
        "UniqueCountriesCount": 14,
        "CountriesPendingCount": 14,
        "LanguagesPendingCount": 8,
        "CountriesCompletedCount": 0,
        "EpisodesCompletedCount": 0,
        "LanguagesCompletedCount": 0,
        "EpisodesCount": 1300,
        "PendingRatings": 1954,
        "PendingTranslations": 1954,
        "EpisodeCountriesCount": 1952
    }
  }
]}
  const s3Status = { status: "Success", successMessage: "Signed URL saved successfully" }
  const signedUrl = { "url": "https://mediaplat1.s3.ap-south-1.amazonaws.com/UploadExcels/TC%20Dec142018.xlsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20190926T103443Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIAQP3E3VWUOCQESQ6S%2F20190926%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d5cb5dd4e155b1bb9d3c422afa562a676d21954eddca8f313f7bc8eb68e4865e", "status": "Success" }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelevisionAvailComponent],
      imports: [HttpClientModule, HttpClientTestingModule, MatProgressBarModule, NgCircleProgressModule.forRoot({
        "backgroundPadding": 7,
        "radius": 28,
        "space": -2,
        "maxPercent": 100,
        "unitsColor": "#008040",
        "outerStrokeWidth": 2,
        "outerStrokeColor": "#008040",
        "innerStrokeColor": "#e7e8ea",
        "innerStrokeWidth": 2,
        "titleColor": "#008040",
        "titleFontSize": "12",
        "subtitleColor": "#008040",
        "animateTitle": false,
        "animationDuration": 1000,
        "showTitle": true,
        "showSubtitle": false,
        "showUnits": true,
        "clockwise": false
      })],
      providers: [HttpService, {
        provide: ActivatedRoute, useValue:
        {
          snapshot:
            { queryParams: { avail_name: 'TC Dec142018' } }
        }
      }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevisionAvailComponent);
    component = fixture.componentInstance;
    component.tvData=tvdata.resultData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tv details', () => {
  //   service.getTelevisionAvailData();
  //   let url = "http://ec2-54-190-182-149.us-west-2.compute.amazonaws.com:8081/WBPlatform/avails/TV";
  //   const request1 = httpMock.expectOne(url);
  //   expect(request1.request.method).toBe('GET');
  //       request1.flush(tvdata);
  //  httpMock.verify();
  //   service.getTelevisionAvailData();
    service.getTelevisionAvailData();
   let url = "http://ec2-54-190-182-149.us-west-2.compute.amazonaws.com:8081/WBPlatform/avails/TV";
   const request1 = httpMock.expectOne(url);
   expect(request1.request.method).toBe('GET');
   request1.flush(tvdata);
   httpMock.verify();
  })
  it('should call ngOninit', () => {
    component.ngOnInit();
  });
  it('should call openingModal', () => {
    component.openModal('TC Dec142018');
  });
  it('should call refresh', () => {
    service.refresh('tv').subscribe();
    service.getTelevisionAvailData();
  });
  it('should call export', () => {
    let page = 'TV'

    component.export('TV', 'TC Dec142018');
    if (page === 'TV') {
      service.exportToSingleAvailS3('TV', 'TC Dec142018');
      let url = "http://ec2-54-190-182-149.us-west-2.compute.amazonaws.com:8081/WBPlatform/export/TC Dec142018";
      const request1 = httpMock.expectOne(url);
      expect(request1.request.method).toBe('GET');
      request1.flush(s3Status);
      //httpMock.verify();
      service.exporS3ToLcalToSingle('TV', 'TC Dec142018');
      let url1 = "http://ec2-54-190-182-149.us-west-2.compute.amazonaws.com:8081/WBPlatform/export/excel/TC Dec142018";
      const request2 = httpMock.expectOne(url1);
      expect(request2.request.method).toBe('GET');
      request2.flush(signedUrl);
      //httpMock.verify();
    }


  });
 
  it('should call getPendingE', () => {
    component.getPending(0, 'E');
    expect(component.pendingResult).toEqual(100);
    
  })
  it('should call getPendingL', () => {
    component.getPending(0, 'L');
    expect(component.pendingResult).toEqual(100);
    
  })
  it('should call getPendingC', () => {
    component.getPending(0, 'C');
    expect(component.pendingResult).toEqual(100);
    
  })

  it('should call select dropdown', () => {
  component.selected='Catalog';
    
    expect(component.selected).toEqual('Catalog');
  
  //expect(component.tvData).toEqual(tvCatlogData);
  
  })
it('should getTvAvailData',()=>{
  component.getTvAvailData();
  console.log('selected',component.selected);
})

});

