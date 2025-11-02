export class Job {
  constructor(id, title, description, pay, category, status = 'Open', posterName = '', contactInfo = '', location = '') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.pay = pay;
    this.category = category;
    this.status = status; // Open, Taken, CounterOffered
    this.posterName = posterName;
    this.contactInfo = contactInfo;
    this.location = location;
    this.createdAt = new Date();
  }
}
