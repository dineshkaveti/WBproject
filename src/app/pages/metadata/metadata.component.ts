import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';
import { ChangeDetectorRef } from "@angular/core";
type Orientation = ( "prev" | "next" | "none" );
@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  animations: [
    trigger('otpAnim', [
      transition(':enter', [
        style({transform: 'translateX(30%)'}),
        animate(100)
      ]),
      
    ]),
  ]
})
export class MetadataComponent implements OnInit {
  public orientation: Orientation;
  private changeDetectRef: ChangeDetectorRef;
  metaDataList:any;
  addClicked:boolean;
  value: string='-';
  availId:any;
  logsDetails = [{"name":'hi', "date":"1/12", "val": "blah blah"},
              {"name":'hii', "date":"1/12", "val": "blah blah"},
              {"name":'hiii', "date":"1/12", "val": "blah blah"},
              {"name":'hiiii', "date":"1/12", "val": "blah blah"}];
  availDetail: any;
  details: any;
  availdetailId: any;
  show: boolean;
  sizeVar: any;
  close: boolean;
  avail: boolean;
  constructor(private httpservice: HttpService) {
    this.show=true;
    this.close=false;
    this.addClicked=false;
    this.sizeVar=15;
   }
  comments = [{"name":'Windstorm', "date":"1/12"},
              {"name":'Bombasto', "date":"1/12"},
              {"name":'Magneta', "date":"1/12"},
              {"name":'Tornado', "date":"1/12"}];
   
              showInput(){
                this.addClicked = true;
              }
  addComment(newComment: string) {
    
    if (newComment) {
      var toDate = Date();
      this.comments.push({"name": newComment, "date": toDate});
    }
  }
  metaDataShow(avail) {
   this.show=false;
   this.close=true;
   this.details= this.availDetail.filter(availdata=>{
      return availdata.account==avail;
    }) 
  }
  showComment(){
    this.close= false;
    this.show=true;
    // document.getElementById("OriginalData").style.width = "28%";
    
  }
  metaDataListUpdateVal:String="-";
  update(data: string) { 
    //var modifiedData = data.replace(/^\s*|\s*$/g,'');
    this.metaDataListUpdateVal = data;
    var toDate = Date();
    this.logsDetails.push({"name": "hi", "date": toDate, "val": data});
  }

  dataSource(database){
if(database==='atom'){
return 'rgba(3, 169, 244,1)';
}
else if(database==='cas')
return 'rgb(70, 22, 92)';
else if(database==='sap'){
  return 'rgb(13, 26, 13)';
}
  }
 sizePlus(){
  this.sizeVar=this.sizeVar+1;
 }
 sizeMinus(){
  this.sizeVar=this.sizeVar-1;
 }
  addHero(newHero: string) {
    if (newHero) {
      this.metaDataList.push(newHero);
    }
  }
openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}
closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  
}
openBox(){
  document.getElementById("compareBox").style.width = "100%";
}
closeBox(){
  document.getElementById("compareBox").style.width = "0";
}
  ngOnInit() {
    this.httpservice.getMetaData().subscribe(data=>{
      this.metaDataList=data;
    })
    // this.httpservice.detailsOfAvail().subscribe(data=>{
    //   this.availDetail=data;
    //   console.log('this.availDetail',this.availDetail);
    // })

   
  }

}
