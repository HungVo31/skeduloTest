import { LightningElement, track, wire, api } from 'lwc';

import getContacts from '@salesforce/apex/skeduloTest2.getContacts';
import getAccounts from '@salesforce/apex/skeduloTest2.getAccounts';

const actions = [
  { label: 'Show details', name: 'show_details' },
];

const cColumns = [
  { label: 'Id', fieldName: 'cid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
  { label: 'Counter', fieldName: 'counter'},
  { label: 'Click to update counter', type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } },
];

const aColumns = [
  { label: 'Id', fieldName: 'aid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
  { label: 'Counter', fieldName: 'counter'},
  { label: 'Click to update counter', type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } },
];

export default class Test3 extends LightningElement {
  searchKey = 'oil';
  siteURL = 'https://hungvo-dev-ed.lightning.force.com/';
  accountSuffix = 'lightning/r/Account/';
  contactSuffix = 'lightning/r/Contact/';
  accountURL = this.siteURL + this.accountSuffix;
  contactURL = this.siteURL + this.contactSuffix;

  cColumns = cColumns;
  aColumns = aColumns;
  // @track concatArray = [];

  @track contacts = [];
  @wire(getContacts, { searchKey: '$searchKey' })
  contactQueryResult(result) {
      const { data, error } = result;
      if(data) {
          let nameUrl, cid, type, counter, clickUpdate;
          this.contacts = data.map(row => { 
              nameUrl = `${this.contactURL}${row.Id}/view`;
              cid = `c${row.Id}`;
              type = 'Contact';
              counter = 0;
              clickUpdate = 0;
              return {...row , nameUrl, cid, type, counter, clickUpdate} 
          })
          this.error = null;
      }
      if(error) {
          this.error = error;
          this.contacts = [];
      }
  }

  @track accounts = [];
  @wire(getAccounts, { searchKey: '$searchKey' })
  accountQueryResult(result) {
      const { data, error } = result;
      if(data) {
        let nameUrl, aid, type, counter, clickUpdate;
          this.accounts = data.map(row => { 
              nameUrl = `${this.accountURL}${row.Id}/view`;
              aid = `a${row.Id}`;
              type = 'Account';
              counter = 0;
              clickUpdate = 0;
              return {...row , nameUrl, aid, type, counter, clickUpdate} 
          })
          this.error = null;
      }
      if(error) {
          this.error = error;
          this.accounts = [];
      }
  }

  changeHandler(event) {
      this.searchKey = event.target.value;
      // this.concatArray = this.contacts.concat(this.accounts);
  }

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;
    switch (action.name) {
      case 'show_details':
        alert('Showing Details: ' + JSON.stringify(row));
        alert(row.type);
        // lay được rowtype, gọi apex để lấy giá trị hiện tại rồi cập nhật xuống object, sau đó reload trang
        break;
    }
  }
}