using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRServer.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly List<UserMessage> _userMessages = new List<UserMessage>();
        
        public Task Send(string message, string nickname)
        {
            _userMessages.Add(new UserMessage(nickname, message));
            return Clients.All.SendAsync("sendMessage", message, nickname);
        }

        public Task GetData()
        {
            return Clients.Caller.SendAsync("getData", _userMessages);
        }
    }

    public class UserMessage
    {
        public UserMessage(string nickname, string message)
        {
            Nickname = nickname;
            Message = message;
        }
        
        public string Nickname { get; set; }
        public string Message { get; set; }
    }
}