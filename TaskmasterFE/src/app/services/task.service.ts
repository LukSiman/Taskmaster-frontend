import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface getTask {
  taskUUID: string;
  taskName: string;
  taskOrder: number;
  taskNote: string;
  taskStatus: number;
  taskStartTime: Date;
  taskEndTime: Date;
  taskDate: Date;
  categoryName: string;
}

export interface getTasks {
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //backend url for task object JSONs
  private baseUrl = `${environment.backendUrl}/tasks`;

  constructor(private httpClient: HttpClient) { }

  getTasks(getUrl: string): Observable<Task[]> {
    return this.httpClient.get<getTasks>(getUrl).pipe(
      map((response: { tasks: Task[]; }) => response.tasks)
    );
  }
}
