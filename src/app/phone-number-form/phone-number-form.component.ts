import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CombinationService } from '../services/combination.service';

@Component({
  selector: 'app-phone-number-form',
  templateUrl: './phone-number-form.component.html',
  styleUrls: ['./phone-number-form.component.css']
})
export class PhoneNumberFormComponent implements OnInit {
  @ViewChild('phoneNumberInput', { static: false })  phoneNumberInput: any;
  showSpecialCharactersError = false;
  validPhoneNumberLength = false;
  formSubmitted = false;
  combinationsFromService;
  combinationsViewPageNumber;
  combinationsTotalCount;

  constructor(private cs: CombinationService) {}

  ngOnInit() {}

  getCombinations(pageNumber=1) {
    this.formSubmitted = true;
    if(this.formSubmitted == true) {
      let phoneNumber: string = this.phoneNumberInput.control.value;
      phoneNumber = phoneNumber.replace(/\-/g, '');
      const phoneNumberArray: string[] = phoneNumber.split('');
      const reqBody = {
        phoneNumber: phoneNumberArray,
        pageNumber
      };
      this.cs.getCombinations(reqBody).subscribe((data: any) => {
        this.formSubmitted = false;
        this.combinationsFromService = data.combinations;
        this.combinationsTotalCount = data.totalCount;
        this.combinationsViewPageNumber = data.page;
      });
    }
  }

  getNewPageFromCombinations(pageNumber) {
    if(pageNumber != NaN) {
      const reqBody = {
        pageNumber
      };
      this.cs.getCombinations(reqBody).subscribe((data: any) => {
        this.combinationsFromService = data.combinations;
        this.combinationsTotalCount = data.totalCount;
        this.combinationsViewPageNumber = data.page;
      });
    }
  }

  validateNumber(event) {
    const phoneNumber: string = this.phoneNumberInput.control.value;
    const phoneNumberLength = phoneNumber.length;
    this.showSpecialCharactersError = this.checkRegex(phoneNumber) ? false : true;
    this.validPhoneNumberLength = (phoneNumberLength == 9 || phoneNumberLength == 12) ? true : false;

    if ((event.key as any) !== undefined && (event.key as any).toLowerCase().trim() !== 'Backspace'.toLowerCase().trim()) {
      let formattedNumber;
      if (phoneNumberLength > 6 && phoneNumber[7] !== '-') {
        formattedNumber = `${phoneNumber.substring(0, 7)}-`;
        this.phoneNumberInput.control.setValue(formattedNumber);
        return;
      }
      if (phoneNumberLength > 2 && phoneNumber[3] !== '-') {
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

  doNewSearch() {
    this.validPhoneNumberLength = false;
    this.combinationsFromService = undefined;
    this.formSubmitted = false;
  }
}
