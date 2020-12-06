import { LightningElement, wire, track, api } from 'lwc';
import getEmployeeTasks from '@salesforce/apex/EmployeeTaskController.getEmployeeTasks';
import getTaskCount from '@salesforce/apex/EmployeeTaskController.getTaskCount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getFieldValue } from 'lightning/uiRecordApi';
// import ID_FIELD from '@salesforce/schema/Task__c.Name';
// import NAME_FIELD from '@salesforce/schema/Task__c.Name__c';
// import DESC_FIELD from '@salesforce/schema/Task__c.Description__c';


// Mapping DB fields to html layout
const COLS = [
    { label: 'Object ID', fieldName: 'Id' },
    { label: 'Task ID', fieldName: 'Name' },
    { label: 'Task Name', fieldName: 'Name__c', editable: true },
    { label: 'Desc', fieldName: 'Description__c', editable: true },
    {
        type: 'button-icon',
        fixedWidth: 40,
        typeAttributes: {
            title: 'Add Task',
            iconName: 'utility:adduser'
        }
    }
];

export default class ProjectTaskList extends LightningElement {
    @track columns = COLS;
    @api recordId; // SF employeeID
    @api test;

    @wire(getEmployeeTasks, {employeeID: '$recordId'})
    employeeTasks;

    @wire(getTaskCount, {employeeID: '$recordId'})
    totalTask(data) { 
        if(data){
            this.test = JSON.parse(JSON.stringify(data)).data;
        }
    } 

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        alert(this.test);
    }

    // deleteRow(row) {
    //     const { id } = row;
    //     const index = this.findRowIndexById(id);
    //     if (index !== -1) {
    //         this.data = this.data
    //             .slice(0, index)
    //             .concat(this.data.slice(index + 1));
    //     }
    // }

    // findRowIndexById(id) {
    //     let ret = -1;
    //     this.data.some((row, index) => {
    //         if (row.id === id) {
    //             ret = index;
    //             return true;
    //         }
    //         return false;
    //     });
    //     return ret;
    // }

    // showRowDetails(row) {
    //     this.record = row;
    // }
}