import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avail-details',
  templateUrl: './avail-details.component.html',
  styleUrls: ['./avail-details.component.scss']
})
export class AvailDetailsComponent implements OnInit {
  showDetails: boolean;
  runspinner: any;
  showDetails1: boolean;
  showDetails2: boolean;
  showDetails3: boolean;
  width: any;
  removeButton: boolean;
  removeAddButton: boolean;
  COMMENTS = 'COMMENTS';
  Comments: string = '';
  multipleList: any = [];
  multipleArray: any = [];
  availDetailsViewList: any;
  clickedOnTitle: boolean;
  clickedOnCountry: boolean;
  clickedOnLanguage: boolean;
  condition: boolean;
  commentValue: any;
  availName: any;
  availdetailsresp: any;
  semicircle: any;
  activatedRoute: any;
  remaining: number;
  widthofTitle: number;
  remainingofTitle: number;
  widthofCountries: number;
  remainingofCountries: number;
  widthofLang: number;
  remainingofLang: number;
  pageName: any;
  constructor(private httpService: HttpService, private location: Location, private route: ActivatedRoute) {
    this.removeButton = false;
    this.removeAddButton = true;
    this.clickedOnTitle = false;
    this.clickedOnCountry = false;
    this.clickedOnLanguage = false;
  }
  comments = [];
  addComment(trigg, newComment: string) {
    if (trigg.keyCode == 13) {
      if (newComment) {
        var toDate = Date();
        this.comments.push({ "name": newComment, "date": toDate });
      }
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  ngOnInit() {
    this.showDetails = true;
    this.showDetails1 = true;
    this.showDetails2 = true;
    this.showDetails3 = true;
    this.width = 75;
    this.route.queryParams.subscribe(params => {
      this.availName = params['avail_name'];
      this.pageName = params['page'];
      let str = this.availName;
      let res = str.split(" ");
      if (res[0] === "IN") {
        this.condition = true;
      } else if (res[0] === "FN") {
        this.condition = false;
      }
    });
    this.httpService.getAvailDetailsAPIView(this.availName, this.pageName).subscribe(data => {
      this.availdetailsresp = data;
      this.availDetailsViewList = this.availdetailsresp.resultData;
      for (let i = 0; i < this.availDetailsViewList.length; i++) {
        if (this.availName === this.availDetailsViewList[i].AvailName) {

          this.widthofTitle = (this.availDetailsViewList[i].TitleData.CompletedTitlesCount / this.availDetailsViewList[i].TitleData.TitlesCount) * 100;
          this.remainingofTitle = (this.availDetailsViewList[i].TitleData.PendingTitlesCount / this.availDetailsViewList[i].TitleData.TitlesCount) * 100;

          this.widthofCountries = (this.availDetailsViewList[i].TitleData.CountriesCompletedCount / this.availDetailsViewList[i].TitleData.UniqueCountriesCount) * 100;
          this.remainingofCountries = (this.availDetailsViewList[i].TitleData.CountriesPendingCount / this.availDetailsViewList[i].TitleData.UniqueCountriesCount) * 100;

          this.widthofLang = (this.availDetailsViewList[i].TitleData.LanguagesCompletedCount / this.availDetailsViewList[i].TitleData.UniqueLanguagesCount) * 100;
          this.remainingofLang = (this.availDetailsViewList[i].TitleData.LanguagesPendingCount / this.availDetailsViewList[i].TitleData.UniqueLanguagesCount) * 100;

        }
      }
    })
  }
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': '48%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '54%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': '12px'
    };
  }
  getAvailDetailsView() { }
  filteredTitle: any;
  filterTitles(data) {
    var availListA = this.availDetailsViewList;
    this.clickedOnTitle = true;
    var filterTitle = [];
    for (let a of availListA) {
      for (let c of a.TitleDetails) {
        if (c.TitleStatus == data) {
          filterTitle.push({ "status": c.TitleStatus, "title_name": c.GlobalTitle });
        }
      }
    }
    this.filteredTitle = filterTitle;
  }
  filteredCountry: any;
  filterCountries(data) {
    var availListB = this.availDetailsViewList;
    this.clickedOnCountry = true;
    var filterCountry = [];
    for (let d of availListB) {
      for (let f of d.CountryData) {
        if (f.CountryStatus == data) {

          filterCountry.push({ "status": f.CountryStatus, "country_name": f.Country });
        }
      }
    }
    this.filteredCountry = filterCountry;
  }
  filteredLanguage: any;
  filterlanguages(data) {
    var availListC = this.availDetailsViewList;
    this.clickedOnLanguage = true;
    var filterLanguage = [];
    for (let g of availListC) {
      for (let l of g.TranslationsData) {
        if (l.TranslationStatus == data) {
          filterLanguage.push({ "status": l.TranslationStatus, "language_name": l.Language });
        }
      }
    }
    this.filteredLanguage = filterLanguage;
  }

  reload() {
    location.reload();
  }
}
