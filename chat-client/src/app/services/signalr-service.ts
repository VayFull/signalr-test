import * as signalR from "@microsoft/signalr";
import {BehaviorSubject} from "rxjs";
import {UserMessage} from "../models/userMessage";
export class signalrService{
  private hubConnection: signalR.HubConnection;
  public userMessages: BehaviorSubject<Array<UserMessage>> = new BehaviorSubject<Array<UserMessage>>(new Array<UserMessage>());

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/chat`)
      .build();

    this.hubConnection.start().then(() => {
      this.hubConnection.invoke("GetData");
    });

    this.hubConnection.on("sendMessage", (message: string, nickname: string) => {
      let arr = this.userMessages.value;
      arr.push(new UserMessage(nickname, message));
      this.userMessages.next(arr);
    });

    this.hubConnection.on("getData", (arr:Array<UserMessage>) => {
      this.userMessages.next(arr);
    })
  };

  public sendMessage(message: string, nickname: string){
    this.hubConnection.invoke("Send", message, nickname);
    console.log(this.userMessages.value);
  }
}
