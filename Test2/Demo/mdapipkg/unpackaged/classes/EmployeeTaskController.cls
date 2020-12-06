public with sharing class EmployeeTaskController {
    @AuraEnabled(cacheable=true)
    public static List<Task__c> getEmployeeTaskList(String projectID){
        return [SELECT Name, Name__c, Description__c FROM Task__c WHERE Task_of_Project__c = :projectID];
    }

    @AuraEnabled(cacheable=true)
    public static List<Task__c> getEmployeeTasks(String employeeID){
        // List<Task__c> empTaskList = new List<Task__c>();
        // List<Employee__c> empProjectIDList = [SELECT Member_of_Project__c from Employee__c where id = :employeeID];
        // for(Employee__c e : empProjectIDList){
        //     empTaskList.addAll(getEmployeeTaskList(e.Member_of_Project__c));
        // }
        // return empTaskList;
        return [SELECT Name, Name__c, Description__c FROM Task__c WHERE Task_of_Project__c IN (SELECT Member_of_Project__c from Employee__c where id = :employeeID)];
    }

    @AuraEnabled()
    public static integer getTaskCount(String employeeID){
        // List<AggregateResult> results= 
        //     [SELECT Count(Name) FROM Task__c WHERE Task_of_Project__c IN (SELECT Member_of_Project__c from Employee__c where id = :employeeID)];
        // return Integer.valueOf(results[0].get('expr0')+'');
        List<Task__c> result = getEmployeeTasks(employeeID);
        return result.size();
    }
}