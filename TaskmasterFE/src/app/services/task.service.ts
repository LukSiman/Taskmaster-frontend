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

  /**
    * This function returns an observable of Task array which fetches all task objects from the backend
    */
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl);
  }

  /**
   * This function returns an observable of Task array which fetches all task objects for the provided date
   */
  getTasksByDate(date: string): Observable<Task[]> {
    let getUrl = `${this.baseUrl}/date/${date}`;
    return this.httpClient.get<Task[]>(getUrl);
  }

  /**
   * This functions deletes a Task by it's UUID from the database
   */
  deleteTask(uuid: string): Observable<string> {
    let deleteUrl = `${this.baseUrl}/${uuid}`;
    return this.httpClient.delete(deleteUrl, { responseType: 'text' });
  }
}
