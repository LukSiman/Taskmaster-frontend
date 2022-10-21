import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = `${environment.backendUrl}/tasks`;

  constructor() { }
}
