import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Task {
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

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //backend url for task object JSONs
  private baseUrl = `${environment.backendUrl}/tasks`;

  constructor(private httpClient: HttpClient) { }

  //gets all task objects from the backend
  getTasks(): Observable<Task[]> { 
    return this.httpClient.get<Task[]>(this.baseUrl);
  }
}
