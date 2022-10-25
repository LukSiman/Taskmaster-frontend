export class Task {
    taskUUID: string;
    taskName: string;
    taskOrder: number;
    taskNote: string;
    taskStatus: number;
    taskStartTime: Date;
    taskEndTime: Date;
    taskDate: Date;
    categoryName: string;

    constructor() {
        this.taskUUID = ""
        this.taskName = "";
        this.taskOrder = 0;
        this.taskNote = "";
        this.taskStatus = 0;
        this.taskStartTime = new Date;
        this.taskEndTime = new Date;
        this.taskDate = new Date;
        this.categoryName = "";
    }
}
