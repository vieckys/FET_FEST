import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss']
})
export class ChildCardComponent implements OnInit {
  @Input() child;

  dayDiff: number = 2;

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

    if (this.dayDiff < 3) {
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
