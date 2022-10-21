import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //backend url for task object JSONs
  private baseUrl = `${environment.backendUrl}/tasks`;

  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    return this.getTasks(this.baseUrl);
  }

  getTasks(baseUrl: string): Observable<Task[]> {
    throw new Error('Method not implemented.');
  }
}

