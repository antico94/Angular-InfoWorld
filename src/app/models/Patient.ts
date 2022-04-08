export class Patient {
  constructor(
    public orderNumber: number,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public sex: string,
    public cnp: string,
    public phoneNumber: string) {
  }
}
