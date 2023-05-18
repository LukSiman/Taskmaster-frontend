export class Task {
    taskUUID: string;
    taskName: string;
    taskNote: string;
    taskStatus: number;
    taskStartTime: string;
    taskEndTime: string;
    taskDate: Date;
    categoryName: string;
    repetition: string;

    constructor() {
        this.taskUUID = ""
        this.taskName = "";
        this.taskNote = "";
        this.taskStatus = 0;
        this.taskStartTime = "";
        this.taskEndTime = "";
        this.taskDate = new Date;
        this.categoryName = "";
        this.repetition  = "";
    }
}
