import { LightningElement, track, wire, api } from 'lwc';

import getContacts from '@salesforce/apex/skeduloTest2.getContacts';
import getAccounts from '@salesforce/apex/skeduloTest2.getAccounts';

const cColumns = [
  { label: 'Id', fieldName: 'cid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
];

const aColumns = [
  { label: 'Id', fieldName: 'aid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
];

export default class HelloWorld extends LightningElement {
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
        let nameUrl,cid,type;
        this.contacts = data.map(row => { 
            nameUrl = `${this.contactURL}${row.Id}/view`;
            cid = `c${row.Id}`;
            type = 'Contact';
            return {...row , nameUrl, cid, type} 
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
        let nameUrl,aid,type;
        this.accounts = data.map(row => { 
            nameUrl = `${this.accountURL}${row.Id}/view`;
            aid = `a${row.Id}`;
            type = 'Account';
            return {...row , nameUrl, aid,type} 
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
}