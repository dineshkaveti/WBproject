import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CropperSettings } from 'ng2-img-cropper';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apo-insight',
  templateUrl: './apo-insight.component.html',
  styleUrls: ['./apo-insight.component.scss']
})
export class AvailInsightComponent implements OnInit {
  showDetails: any;
  showStatus: any;
  width: any;
  availsList: any = [];
  showTitlesText: any;
  showCountriesText: any;
  showLanguagesText: any;
  completedWidth: any;
  pendingWidth: any;
  showDetails1: boolean;
  showDetails2: boolean;
  showDetails3: boolean;
  removeButton: boolean;
  removeAddButton: boolean;
  COMMENTS = 'COMMENTS';
  Comments: string = '';
  multipleList: any = [];
  multipleArray: any = [];
  availDetailsViewList: any = [];
  availName: string;
  titleId: any;
  titleName: string;
  titleStartDate: any;
  titleEndDate: any;
  availHistoryText: any;
  availHistory: any;

  condition: boolean;
  cropTitle:any;
  cropAccounts:any;
  cropCountries:any;
  cropLanguages:any;
  stages: { stageTitle: string; active:string; date: string }[];
  progress: number;
  data: any;
  tvAvailName: any;
  seriesName: any;
  seasonNumber: any;
  lobType: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  routeName: any;
  showApoBread: boolean;
  UniqueAccontsCount: any;
  episodeNumber: any;
  sizeVar: any;
  titleComments: any;
  comments: any;
  commentValue: string;
  completeFlag: boolean;
  timeLineData: any;

  cropImage() {
    let img = document.getElementsByName("main_img")[0];
    if (img != null) {
      let main_img = img["src"];
      var image: any = new Image();
      image.src = main_img;
      this.cropper.setImage(image);
    }
  }

  saveCropImage() {
    let img_final = document.getElementsByName("final_img")[0];
    if (img_final) {
      let final_img = document.getElementsByName("final_img")[0]["src"];
      document.getElementsByName("main_img")[0]["src"] = final_img;
    }
  }

  // addMultipleValue(point) {
  //   if (!this.multipleList[point]) {
  //     this.multipleList[point] = [];
  //     this.multipleArray[point] = [];
  //     this.removeAddButton = false;
  //   }
  //   var val = ''
  //   switch (point) {
  //     case this.COMMENTS:
  //       if (this.Comments) {
  //         val = this.Comments
  //       }
  //       this.Comments = '';
  //       break;
  //   }
  //   if (val) {
  //     this.multipleList[point].push({ n: val });
  //     this.multipleArray[point].push(val);
  //   }
  //   if (!this.removeButton) {
  //     this.removeButton = true;
  //   } else {
  //     this.removeButton = false;
  //   }
  // }
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};
    this.cropperSettings.croppedWidth = 175
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 200;
    this.data = {};

   
    this.stages = [
      { stageTitle: "Announced", active: "N", date: "" },
      { stageTitle: "Data Collation", active: "N", date: "" },
      { stageTitle: "Quality Audit", active: "N", date: "" },
      { stageTitle: "Data Delivery", active: "N", date: "" }
    ];
   
  }
  ngOnInit() {
    this.showDetails = -1;
    this.width = 75;
    this.showDetails = true;
    this.showDetails1 = true;
    this.showDetails2 = true;
    this.showDetails3 = true;
    this.width = 75;
    this.route.queryParams.subscribe(params => {
      this.availName = params['avail_name'];
      this.titleId = params['titleId'];
   //   console.log(this.titleId);
      this.titleName = params['title_name'];
      this.seriesName = params['seriesName'];
      this.seasonNumber = params['seasonNumber'];
      this.episodeNumber = params['episodeNumber'];
    //  console.log(this.episodeNumber);

      this.lobType = params['lob'];
      this.routeName = params['routeName'];
    //  console.log(this.lobType);
      if(this.availName!="title"){
        let str =  this.availName;
        let res = str.split(" ");
        if(res[0] === 'TN' || res[0] === 'TC'|| res[0] === 'TD' || (res[0] === "LDC" && this.lobType == "TV")) {
          this.tvAvailName = true;
          }
          if( res[0]==="IN" || (res[0] === "LDC" && this.lobType == "ITUNES")){
          this.condition = true;
          }else if(res[0]==="FN" || res[0]==="FC" || res[0]=="FT" || (res[0] === "LDC" && this.lobType == "FILMS")) {
          this.condition = false;
          }
          this.showApoBread = false;
      }else if(this.routeName=='APO' || this.availName=="title"){
        this.showApoBread = true;
        this.tvAvailName=false;
        this.condition = false;
        this.availName = "title";
        //this.titleName = undefined;
      }
       
         
        
    });
    this.httpService.getAvailInsightDetails(this.availName, this.titleId, this.lobType).subscribe(data => {
      this.availDetailsViewList.push(data);
      // this.availHistory = this.availDetailsViewList[0].AvailHistory;
     // console.log(this.availDetailsViewList[0].AvailHistory);
      this.titleStartDate = this.availDetailsViewList.StartDate;
      this.titleEndDate = this.availDetailsViewList.DueDate;
      this.comments=this.availDetailsViewList.AvailComments;
      this.timeLineData =  this.availDetailsViewList[0].TitleStatus;
      this.checkTimeline();
    })


    this.route.queryParams.subscribe(params => {
        this.cropTitle = params.title;
        this.cropAccounts = params.accounts;
        this.cropCountries = params.countries;
        this.cropLanguages = params.languages;
      //  console.log('Avails Details data', this.cropAccounts);
    });



    this.availsList = [
      {
        "id": "1",
        "avail_name": "availOne",
        "avail_title": "FC JAN232019",
        "date_of_arrival": "01/15",
        "date_of_delivery": "21/03",
        "total_avail_percentage": "100",
        "avail_details": [
          {
            "titlesDetails": [
              {
                "id": "1",
                "title_name": "Aquaman",
                "announced_date": "12/09",
                "release_date": "12/12",
                "percentage_title": "30",
                "status": "Announced",
                "image_url": "assets/images/aquaman_big.jpg",
                "accounts_count": "70",
                "countries_count": "32",
                "languages_count": "28",
                "accounts_completed": "100",
                "accounts_pending": "14",
                "countries_completed": "30",
                "countries_pending": "2",
                "languages_completed": "20",
                "langauges_pending": "8",
                "pending_title_translations_count": "112",
                "pending_title_ratings_count": "115",
                "pending_title_clarifications_count": "38",
                "escalations_title_count": "2"
              }
            ],
            "titlesCount": "114",
            "titlesCompleted": "100",
            "titlesPending": "14",
            "countriesCount": "150",
            "countriesCompleted": "90",
            "countriesPending": "60",
            "languagesCount": "120",
            "languagesCompleted": "70",
            "languagesPending": "50",
            "pending_avail_translations_count": "123",
            "pending_avail_ratings_count": "112",
            "pending_avail_clarifications_count": "15",
            "escalations_avail_count": "2"
          }
        ]
      },
      {
        "id": "2",
        "avail_name": "availTwo",
        "avail_title": "FC JAN232019",
        "date_of_arrival": "01/15",
        "date_of_delivery": "21/03",
        "total_avail_percentage": "100",
        "avail_details": [
          {
            "titlesDetails": [
              {
                "id": "2",
                "title_name": "A Star is Born",
                "announced_date": "12/09",
                "release_date": "12/12",
                "percentage_title": "60",
                "status": "Announced",
                "image_url": "assets/images/a_star_is_born_big.jpg",
                "accounts_count": "114",
                "countries_count": "32",
                "languages_count": "28",
                "accounts_completed": "100",
                "accounts_pending": "14",
                "countries_completed": "30",
                "countries_pending": "2",
                "languages_completed": "20",
                "langauges_pending": "8",
                "pending_title_translations_count": "112",
                "pending_title_ratings_count": "115",
                "pending_title_clarifications_count": "38",
                "escalations_title_count": "2"
              }
            ],
            "titlesCount": "100",
            "titlesCompleted": "50",
            "titlesPending": "50",
            "countriesCount": "150",
            "countriesCompleted": "60",
            "countriesPending": "90",
            "languagesCount": "120",
            "languagesCompleted": "60",
            "languagesPending": "60",
            "pending_avail_translations_count": "123",
            "pending_avail_ratings_count": "112",
            "pending_avail_clarifications_count": "15",
            "escalations_avail_count": "2"
          }
        ]
      },
    ]
    
  }
  checkTimeline(){
   
    var l = this.timeLineData.length;
    // for(let j=0;j<l;j++){
    //   this.stages = [
    //     { stageTitle: "Announced", active: "N", date: "" },
    //     { stageTitle: "Data Collation", active: "N", date: "" },
    //     { stageTitle: "Quality Audit", active: "N", date: "" },
    //     { stageTitle: "Data Delivery", active: "N", date: "" }
    //   ];
    //   if(this.timeLineData[j].StatusMessage == "Completed"){
    //     this.completeFlag = true;
    //     for(let k=0;k<this.stages.length;k++){
    //       this.stages[k].active = "Y";
          
    //       if(j==1){
    //         this.stages[0].date = this.timeLineData[0].StatusDate;
    //         this.stages[1].date = "";
    //         this.stages[2].date = "";
    //         this.stages[3].date = this.timeLineData[l-1].StatusDate;
    //       }else if(j==2){
    //         this.stages[0].date = this.timeLineData[0].StatusDate;
    //         this.stages[1].date = this.timeLineData[1].StatusDate;
    //         this.stages[2].date = "";
    //         this.stages[3].date = this.timeLineData[l-1].StatusDate;
    //       }else if(j==3){
    //          this.stages[0].date = this.timeLineData[0].StatusDate;
    //         this.stages[1].date = this.timeLineData[1].StatusDate;
    //         this.stages[2].date = this.timeLineData[2].StatusDate;
    //         this.stages[3].date = this.timeLineData[l-1].StatusDate;
    //       }
          
    //     }
    //   }else{
    //     this.completeFlag = false;
    //     for(let i=l;i>0;i--){
    //       this.stages[i-1].active = "Y";
    //       this.stages[i-1].date = this.timeLineData[i-1].StatusDate;
    //     }
    //   }
    // }
    if(l>0){
      
        if(l==2 && this.timeLineData[1].StatusMessage == "Completed" ){
          this.stages[0].date = this.timeLineData[0].StatusDate;
          this.stages[0].active = "Y";
          this.stages[1].date = "";
          this.stages[1].active = "Y";
          this.stages[2].date = "";
          this.stages[2].active = "Y";
          this.stages[3].date = this.timeLineData[l-1].StatusDate;
          this.stages[3].active = "Y";
        }else{
          for(let i=l;i>0;i--){
            this.stages[i-1].active = "Y";
            this.stages[i-1].date = this.timeLineData[i-1].StatusDate;
          }
        }
      
       
    }
  }

  sizePlus(){
    this.sizeVar=this.sizeVar+1;
   }
   sizeMinus(){
    this.sizeVar=this.sizeVar-1;
   }

  reload() {
    location.reload();
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    
  }
  addComment(trigg, newComment: string) {
    
    if(trigg.keyCode==13){
     
      if (newComment) {
        var toDate = Date();
        if(this.comments == undefined){
          this.comments = [{}];
          
          this.comments[0] = {"CommentBy": "John Paul", "TimeStamp": toDate,"CommentDescription":newComment};
        }else{
          var len = this.comments.length;
          this.comments[len] = {"CommentBy": "John Paul", "TimeStamp": toDate,"CommentDescription":newComment};
        }
        this.commentValue = "";
        
      }
  }
  }
  getProgress(title) {
    var l = title.length;
    var result= this.getProgressSwitch(title,l);
    return result;
  }
  getProgressFill(title) {
    var l = title.length;
    if(title[l-1].StatusMessage==""){
      return -1
    }else{
      var result= this.getProgressSwitch(title,l);
      return result;
    }
  }
  getProgressSwitch(title,l){
    for(let j=0;j<l;j++){
      if(title[j].StatusMessage == "Completed"){
        this.completeFlag = true;
      }else{
        this.completeFlag = false;
      }
    }
    switch (title[l-1].StatusMessage) {
      case "Announced": this.progress = 0;
        break;
      case "Data Collation": this.progress = 1;
        break;
      case "Quality Audit": this.progress = 2;
        break;
      case "Data Delivery": this.progress = 3;
        break;
      case "": this.progress = 0;
        break;

    }
    return this.progress;
  }


  getCompleted(n) {
    var result;
   

      result = (this.availDetailsViewList[n].AccontsCompletedCount * 100) / this.availDetailsViewList[n].UniqueAccontsCount;
       
   
    return result;
  }
  getPending(n) {
    var result;
    
      result = (this.availDetailsViewList[n].AccontsPendingCount * 100) / this.availDetailsViewList[n].UniqueAccontsCount;
       

   
    return result;
  }

}
