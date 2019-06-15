import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss']
})
export class ChildCardComponent implements OnInit {
  @Input() child;
  constructor() {
   }

  ngOnInit() {
    
  }

  notificationGranted = () => {
    if (Notification && Notification.permission === "granted") {
        return true;
    } else if (Notification && Notification.permission !== "denied") {
        
        Notification.requestPermission(function (status) {
            if (status === "granted") {
              return true;
            } else {
              return false;
            }
        });

    } else {
        return false;
    }
  }

  notifyMe(data) {
    console.log('----->', data);
    let daysDiff = 2;
    //let currentDate = new Date();
    //let nextVaccineDate = new Date(data.vaccine.date);

    //console.log(currentDate , nextVaccineDate );

    //daysDiff = Math.ceil(Math.abs(nextVaccineDate.getTime() - currentDate.getTime()) / (1000*60*60*24));

    console.log('------->', daysDiff);

    if (daysDiff < 3) {
      setInterval(() => {
        this.createNotification(data);
      }, 10000); 
    }
  }

  createNotification(data) {
    if(this.notificationGranted()){
        var notification = new Notification('VaccTrack Notification', {
          icon: '',
          body: `Next Vaccine Due for ${data.name} on ${data.vaccine.date} | ${data.vaccine.name}`,
          lang: 'en',
          dir: 'auto'
        });
    } else {
        alert('Notification DENIED!');
    }
  }

}
