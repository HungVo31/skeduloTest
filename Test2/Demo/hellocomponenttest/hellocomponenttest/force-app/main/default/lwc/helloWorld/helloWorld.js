import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'Worldnew ne';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}