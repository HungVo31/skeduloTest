import { LightningElement, wire, track, api } from 'lwc';
import getEmployeeTasks from '@salesforce/apex/EmployeeTaskController.getEmployeeTasks';
import getTaskCount from '@salesforce/apex/EmployeeTaskController.getTaskCount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// import ID_FIELD from '@salesforce/schema/Task__c.Name';
// import NAME_FIELD from '@salesforce/schema/Task__c.Name__c';
// import DESC_FIELD from '@salesforce/schema/Task__c.Description__c';



const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
];
// Mapping DB fields to html layout
const COLS = [
    { label: 'ID', fieldName: 'Name' },
    { label: 'Task Name', fieldName: 'Name__c', editable: true },
    { label: 'Desc', fieldName: 'Description__c', editable: true },
    {
        type: 'action',
        fixedWidth: 40,
        typeAttributes: {
            rowActions: actions
        }
    }
];

export default class ProjectTaskList extends LightningElement {
    @track columns = COLS;
    @api recordId; // SF employeeID

    @wire(getEmployeeTasks, {employeeID: '$recordId'})
    employeeTasks;

    @wire(getTaskCount, {employeeID: '$recordId'})
    totalTask;

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                const event = new ShowToastEvent({
                    title: 'Get Help',
                    message: 'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
                });
                this.dispatchEvent(event);
                break;
            case 'show_details':
                // this.showRowDetails(row)
                //     .then(result =>{                
                //         window.console.log('resutl ===> ' +result);
                //         this.dispatchEvent(new ShowToastEvent({
                //             title: 'show_details!!',
                //             message: 'This employee has just been assigned to this Task!!',
                //             variant: 'success'
                //         }),);
                //         return window.location.reload(true);
                //     });
                break;
            default:
        }
    }

    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }

    showRowDetails(row) {
        this.record = row;
    }
}