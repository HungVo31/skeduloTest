@isTest
public with sharing class EmployeeTaskControllerTest {
    private static List<Employee__c> empList;
    private static List<Project__c> prjList;
    private static List<Task__c> taskList;

    public static void createTestData(){
        empList = new List<Employee__c>();
        prjList = new List<Project__c>();
        taskList = new List<Task__c>();


        Employee__c e1 = new Employee__c(Name__c='Hung_PM1', Birthday__c=Date.newInstance(1990,1,1), JoinDate__c=Date.newInstance(2013,1,1),  Mail__c='hung1@hung.hung', Role__c='Project manager');
        Employee__c e2 = new Employee__c(Name__c='Hiep_PM22', Birthday__c=Date.newInstance(1991,1,1), JoinDate__c=Date.newInstance(2014,1,1),  Mail__c='hiep2@hiep2.hiep2', Role__c='Project manager');
        Employee__c e3 = new Employee__c(Name__c='Hung_culi3', Birthday__c=Date.newInstance(1992,1,1), JoinDate__c=Date.newInstance(2015,1,1),  Mail__c='hung3@hung.hung', Role__c='Programmer');
        Employee__c e4 = new Employee__c(Name__c='Hung_culi4', Birthday__c=Date.newInstance(1993,1,1), JoinDate__c=Date.newInstance(2016,1,1),  Mail__c='hung4@hung.hung', Role__c='Programmer');
        Employee__c e5 = new Employee__c(Name__c='Hiep_culi5', Birthday__c=Date.newInstance(1994,1,1), JoinDate__c=Date.newInstance(2017,1,1),  Mail__c='hiep5@hiep5.hiep5', Role__c='Programmer');
        empList.add(e1);
        empList.add(e2);
        empList.add(e3);
        empList.add(e4);
        empList.add(e5);
        insert empList;

        // empList.clear();
        // empList = [SELECT Name, Name__c FROM Employee__c];

        Project__c prj1 = new Project__c(Name__c='BI Tool', PM_Name__c=empList.get(0).id);
        Project__c prj2 = new Project__c(Name__c='Cafe', PM_Name__c=empList.get(1).id);
        prjList.add(prj1);
        prjList.add(prj2);
        insert prjList;

        prjList.clear();
        prjList = [SELECT Name FROM Project__c];

        e3.Member_of_Project__c = prj1.id;
        e4.Member_of_Project__c = prj1.id;
        e5.Member_of_Project__c = prj2.id;

        upsert e3;
        upsert e4;
        upsert e5;
        // empList.clear();
        // empList.add(e1);
        // empList.add(e2);
        // empList.add(e3);
        // empList.add(e4);
        // empList.add(e5);

        Task__c t1 = new Task__c(Task_Type__c='Design', Process__c='Open', Task_of_Project__c=prj1.id);
        Task__c t2 = new Task__c(Task_Type__c='Code', Process__c='Open', Task_of_Project__c=prj1.id);
        Task__c t3 = new Task__c(Task_Type__c='Code', Process__c='Open', Task_of_Project__c=prj1.id);
        Task__c t4 = new Task__c(Task_Type__c='Design', Process__c='Open', Task_of_Project__c=prj2.id);
        Task__c t5 = new Task__c(Task_Type__c='Code', Process__c='Open', Task_of_Project__c=prj2.id);
        taskList.add(t1);
        taskList.add(t2);
        taskList.add(t3);
        taskList.add(t4);
        taskList.add(t5);
        insert taskList;
    }
    @isTest static void getEmployeeTaskListTest(){
        EmployeeTaskControllerTest.createTestData();
        Project__c biPrj = prjList.get(0);
        List<Task__c> actualTaskList = EmployeeTaskController.getEmployeeTaskList(biPrj.id);
        List<Task__c> expectedTaskList = new List<Task__c>();
        for(Task__c t : taskList){
            if(t.Task_of_Project__c == biPrj.id){
                expectedTaskList.add(t);
            }
        }
        System.assert(actualTaskList.size() > 0);
        System.assert(expectedTaskList.size() == 3);
        System.assert(expectedTaskList.size() == actualTaskList.size());
    }

    @isTest static void getTaskCountTest(){
        EmployeeTaskControllerTest.createTestData();
        Employee__c biPrjE1 = empList.get(2);
        Integer actualTaskListSize = EmployeeTaskController.getTaskCount(biPrjE1.id);
        List<Task__c> expectedTaskList = new List<Task__c>();
        for(Task__c t : taskList){
            if(t.Task_of_Project__c == biPrjE1.Member_of_Project__c){
                expectedTaskList.add(t);
            }
        }
        System.assert(actualTaskListSize == 3);
        System.assert(expectedTaskList.size() == 3);
    }
}
