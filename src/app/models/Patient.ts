export class Patient {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public birthDate: string,
    public sex: string,
    public cnp: string,
    public phoneNumber: string) {
  }
}
