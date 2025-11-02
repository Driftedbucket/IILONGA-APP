export class User {
  constructor(id, name, role, verified = false) {
    this.id = id;
    this.name = name;
    this.role = role; // 'Seeker' or 'Employer'
    this.verified = verified;
  }
}
