import { Component, OnInit, ViewChildren, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
interface Stages {
  stageTitle: String;
}

@Component({
  selector: 'app-avail-titles',
  templateUrl: './avail-titles.component.html',
  styleUrls: ['./avail-titles.component.scss']
})
export class AvailTitlesComponent implements OnInit {
 
 
  showStatus: any;
  apoList: any;
  titleStatus: boolean = false;
  langStatus: boolean = false;
  transStatus: boolean = false;
  accStatus: boolean = false;
  emptyMsg: boolean;
  width: any;
  account: any;
  titleName: any;
  avail_title: any;
  remaining: any;
  public stages: Stages[];
  status: any;
  ImageURL: string = " ";
  fileToUpload: File;
  removeButton: boolean;
  files: any;
  selectedRecord: any;
  uploadStatus: boolean;
  titleid: any;
  progress: number;
  acccountClicked: boolean = false;
  countriesClicked: boolean = false;
  translationsClicked: boolean = false;
  todaydate: any;
  duedate: any;
  parentMessage: any;
  availName: any;
  filmstitlesresp: any;
  apoListlength: any;
  @ViewChildren('someVar') filteredItems;
  searchval: any;
  semicircle: any;
  completeFlag: boolean;
  
  
  //changeDetection: ChangeDetectionStrategy.OnPush
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
    
      // this.filteredItems= this.apoList;
      // this.changeDetectRef = changeDetectRef;
      // this.changeDetectRef.detectChanges();
    this.parentMessage = "TV";
    this.stages = [
      { stageTitle: "Announced" },
      { stageTitle: "Data Collation" },
      { stageTitle: "Quality Audit" },
      { stageTitle: "Data Delivery" }
    ];

    this.ImageURL = 'assets/images/dummy.png';
    this.removeButton = false;

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

  showTitleStatus(index) {
    this.showStatus = index;
    this.accStatus = false;
    this.langStatus = false;
    this.transStatus = false;
    this.account = index;
  }
  showAccounts(index) {
    this.account = index;
    this.showStatus = -1;
    this.acccountClicked = true;
  }
  showCountries(index) {
    this.account = index;
    this.showStatus = -1;
    this.countriesClicked = true;
  }
  showTranslations(index) {
    this.account = index;
    this.showStatus = -1;
    this.translationsClicked = true;
  }
  selectTab(title, tabselected) {
    for (let i = 0; i < this.apoList.length; i++) {
      if (title === this.apoList[i].GlobalTitle) {
        if (tabselected == "titles") {
          this.accStatus = true;
          this.langStatus = false;
          this.transStatus = false;
          this.titleName = title;
          this.width = (this.apoList[i].AccontsCompletedCount / this.apoList[i].AccontsCount) * 100;
          this.remaining = (this.apoList[i].AccontsPendingCount / this.apoList[i].AccontsCount) * 100;
        }
        else if (tabselected == "countries") {
          this.accStatus = false;
          this.langStatus = true;
          this.transStatus = false;
          this.titleName = title;
          this.width = (this.apoList[i].CountriesCompletedCount / this.apoList[i].CountriesCount) * 100;
          this.remaining = (this.apoList[i].CountriesPendingCount / this.apoList[i].CountriesCount) * 100;
        }
        else if (tabselected == "languages") {
          this.accStatus = false;
          this.langStatus = false;
          this.transStatus = true;
          this.titleName = title;
          this.width = (this.apoList[i].LanguagesCompletedCount / this.apoList[i].LanguagesCount) * 100;
          this.remaining = (this.apoList[i].LanguagesPendingCount / this.apoList[i].LanguagesCount) * 100;

        }
      }
    }
  }
  getApoData() {
    this.httpService.getAvailTittlesData(this.availName).subscribe(data => {
      this.filmstitlesresp = data;
      this.apoList = this.filmstitlesresp.resultData;
      this.apoListlength=this.apoList.length;
      // this.count=this.apoListlength;
     
    })
  }
  ngOnInit() {
   
    this.account = -1;
    this.showStatus = -1;
  
    this.activatedRoute.queryParams.subscribe(params => {
      this.availName = params['avail_name'];
    });

    this.getApoData();
   
    this.cdr.detectChanges();
    // this.httpService.refresh('avail').subscribe(dataof => {
    //   this.getApoData();
    // })


  }
  
  imgClickTrack(record, index) {
    this.showStatus = -1;
    this.accStatus = false;
    this.langStatus = false;
    this.transStatus = false;
    this.account = -1;
    this.selectedRecord = record;
    if (this.selectedRecord.ImageURL == "") {
      this.uploadStatus = false;
    } else {
      this.uploadStatus = true;
    }
  }
  handleFileInputForAdd(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedRecord.ImageURL = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.removeButton = true;
  }
  triggerUpload() {
    this.files = [];
    if (this.ImageURL == "assets/images/dummy.png") {
      const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
      fileUpload.click();
    }
  }

  getProgress(title) {
    var l = title.length;
    var result = this.getProgressSwitch(title, l);
    return result;
  }
  getProgressFill(title) {
    var l = title.length;
    if (title[l - 1].StatusMessage == "") {
      return -1
    } else {
      var result = this.getProgressSwitch(title, l);
      return result;
    }
  }
  getProgressSwitch(title, l) {
    for(let j=0;j<l;j++){
      if(title[j].StatusMessage == "Completed"){
        this.completeFlag = true;
      }else{
        this.completeFlag = false;
      }
    }
    switch (title[l - 1].StatusMessage) {
      case "Announced": this.progress = 0;
        break;
      case "Data Collation": this.progress = 1;
        break;
      case "Quality Audit": this.progress = 2;
        break;
      case "Data Delivery": this.progress = 3;
        break;
      case "Completed": this.progress = 3;
        break;
      case "": this.progress = 0;
        break;

    }
    return this.progress;
  }


  getColor(duedate) {
    var todaydate = new Date();
    duedate = new Date(duedate);
    var duedat = duedate.getMonth() + 1 + '/' + duedate.getDate() + '/' + duedate.getFullYear();
    var date = todaydate.getMonth() + 1 + '/' + todaydate.getDate() + '/' + todaydate.getFullYear();
    //console.log(duedat, date, '&&&&&')
    if (date < duedat) {
      return "lessthan-todaydate";
    }
    else {
      return "due-date";
    }
  }
  
  onSearch(searchtext){
      this.searchval=searchtext;
        this.cdr.detectChanges();
  
  //  this.changeDetectRef.detectChanges();
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
   
  }
  
}



