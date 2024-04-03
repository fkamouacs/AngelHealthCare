function createProcesses(_id, name, patient, currStage, procedureIds, startDate, endDate) {
    return {_id, name, patient, currStage, procedureIds, startDate, endDate };
  }
  
  export const processes = [
    createProcesses(1,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(2,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(3,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(4,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(5,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
    createProcesses(6,'Knee Surgery', "JohnSmith", "preop", [1,2,3,4], "2/1/2024", "N/A"),
  ];

  function createProcedure(_id, name, patient, stage, staff, resources, rooms, documents) {
    return {_id, name, patient, stage, staff, resources, rooms, documents}
  }
  
  export const procedures = [
    createProcedure(1,"preop", "John Smith", "success", [1,2],[1,2],[1], "http://google.com" ),
    createProcedure(2,"Knee Surgery", "John Smith", "success",[3,4],[1,2],[1], "http://google.com"),
    createProcedure(3,"postop","John Smith", "primary",[1,2],[1,2],[1], "http://google.com"),
    createProcedure(4,"checkup", "John Smith", "disabled", [3,4],[1,2],[1], "http://google.com"),
  ]

