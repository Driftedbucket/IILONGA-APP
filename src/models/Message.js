export class Message {
  constructor(id, sender, receiver, content, timestamp = new Date(), type = 'notification') {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.timestamp = timestamp;
    this.type = type; // 'notification', 'job-offer', 'system'
    this.read = false;
  }
}
