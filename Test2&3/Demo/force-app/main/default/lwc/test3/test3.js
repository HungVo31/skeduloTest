import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { updateRecord } from 'lightning/uiRecordApi';

import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_COUNTER_FIELD from '@salesforce/schema/Account.counter__c';
import CONTACT_ID_FIELD from '@salesforce/schema/Contact.Id'
import CONTACT_COUNTER_FIELD from '@salesforce/schema/Contact.counter__c'

import getContacts from '@salesforce/apex/skeduloTest2.getContacts';
import getAccounts from '@salesforce/apex/skeduloTest2.getAccounts';
import updateAccountCounter from '@salesforce/apex/skeduloTest2.updateAccountCounter';

const actions = [
  { label: 'Increment Counter', name: 'increase_counter' },
];

const cColumns = [
  { label: 'Id', fieldName: 'cid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
  { label: 'Counter', fieldName: 'counter__c'},
  { label: 'Click to update counter', type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } },
];

const aColumns = [
  { label: 'Id', fieldName: 'aid' },
  { label: 'Name', fieldName: 'Name' },
  { label: 'Record Type', fieldName: 'type' },
  { label: 'URL', fieldName: 'nameUrl', type: 'url' },
  { label: 'Counter', fieldName: 'counter__c'},
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
          let nameUrl, cid, type, clickUpdate;
          this.contacts = data.map(row => { 
              nameUrl = `${this.contactURL}${row.Id}/view`;
              cid = `c${row.Id}`;
              type = 'Contact';
              clickUpdate = 0;
              return {...row , nameUrl, cid, type, clickUpdate} 
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
        let nameUrl, aid, type, clickUpdate;
          this.accounts = data.map(row => { 
              nameUrl = `${this.accountURL}${row.Id}/view`;
              aid = `a${row.Id}`;
              type = 'Account';
              clickUpdate = 0;
              return {...row , nameUrl, aid, type, clickUpdate} 
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
      case 'increase_counter':
        if (row.type == 'Account'){
            const fields = {};
            fields[ACCOUNT_ID_FIELD.fieldApiName] = row.Id;
            fields[ACCOUNT_COUNTER_FIELD.fieldApiName] = row.counter__c + 1;
            const recordInput = { fields };

            updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account updated',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
        } else {
          const fields = {};
          fields[CONTACT_ID_FIELD.fieldApiName] = row.Id;
          fields[CONTACT_COUNTER_FIELD.fieldApiName] = row.counter__c + 1;
          const recordInput = { fields };

          updateRecord(recordInput)
              .then(() => {
                  this.dispatchEvent(
                      new ShowToastEvent({
                          title: 'Success',
                          message: 'Contact updated',
                          variant: 'success'
                      })
                  );
              })
              .catch(error => {
                  this.dispatchEvent(
                      new ShowToastEvent({
                          title: 'Error creating record',
                          message: error.body.message,
                          variant: 'error'
                      })
                  );
              });
        }
        break;
    }
  }
}