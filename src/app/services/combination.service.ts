import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CombinationService {
  alphabets: any[] = [];

  constructor(private http: HttpClient) {}

  getCombinations(phoneNumberArray) {
    // console.log('sending request to backend');
    // console.log({phoneNumberArray});
    return this.http.post('http://localhost:3000/', phoneNumberArray);
  }

}
