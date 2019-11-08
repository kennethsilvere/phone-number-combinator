import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-phone-number-form",
  templateUrl: "./phone-number-form.component.html",
  styleUrls: ["./phone-number-form.component.css"]
})
export class PhoneNumberFormComponent implements OnInit {
  @ViewChild("phoneNumberInput", { static: false })  phoneNumberInput: any;
  showSpecialCharactersError = false;
  validPhoneNumberLength = false;
  formSubmitted = false;

  constructor() {}

  ngOnInit() {}

  getCombinations() {
    this.formSubmitted = true;
    setTimeout(() => this.formSubmitted = false, 3000);
  }

  validateNumber(event) {
    const phoneNumber: string = this.phoneNumberInput.control.value;
    const phoneNumberLength = phoneNumber.length;
    this.showSpecialCharactersError = this.checkRegex(phoneNumber) ? false : true;
    this.validPhoneNumberLength = (phoneNumberLength == 9 || phoneNumberLength == 12) ? true : false;

    if ((event.key as any).toLowerCase().trim() !== "Backspace".toLowerCase().trim()) {
      let formattedNumber;
      if (phoneNumberLength > 6 && phoneNumber[7] !== "-") {
        formattedNumber = `${phoneNumber.substring(0, 7)}-`;
        this.phoneNumberInput.control.setValue(formattedNumber);
        return;
      }
      if (phoneNumberLength > 2 && phoneNumber[3] !== "-") {
        formattedNumber = `${phoneNumber.substring(0, 3)}-`;
        this.phoneNumberInput.control.setValue(formattedNumber);
        return;
      }
    }
  }

  checkRegex(phoneNumber) {
    const regexPattern = new RegExp('^[a-zA-Z0-9-]*$');
    return regexPattern.test(phoneNumber);
  }
}
