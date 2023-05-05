export class Task {
    taskUUID: string;
    taskName: string;
    taskNote: string;
    taskStatus: number;
    // taskStartTime: Date;
    // taskEndTime: Date;
    taskStartTime: string;
    taskEndTime: string;
    taskDate: Date;
    categoryName: string;

    constructor() {
        this.taskUUID = ""
        this.taskName = "";
        this.taskNote = "";
        this.taskStatus = 0;
        // this.taskStartTime = new Date;
        // this.taskEndTime = new Date;
        this.taskStartTime = "";
        this.taskEndTime = "";
        this.taskDate = new Date;
        this.categoryName = "";
    }
}
