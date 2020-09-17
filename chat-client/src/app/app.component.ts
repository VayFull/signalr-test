import { Component } from '@angular/core';
import {signalrService} from "./services/signalr-service";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserMessage} from "./models/userMessage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userMessages: BehaviorSubject<Array<UserMessage>>;

  constructor(private signalRService: signalrService) {
    this.userMessages = signalRService.userMessages;
  }
  title = 'chat-client';

  sendMessage(message: string, nickname: string){
    this.signalRService.sendMessage(message, nickname);
  }

  ngOnInit() {
    this.signalRService.startConnection();
  }
}
