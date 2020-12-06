import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import DESC_FIELD from '@salesforce/schema/Task__c.Description__c';

export default class TaskDetail extends LightningElement {
    @api recordId;

    fields = [DESC_FIELD];

    @wire(getRecord, { recordId: '$recordId', fields: [DESC_FIELD]})
    taskDesc
}