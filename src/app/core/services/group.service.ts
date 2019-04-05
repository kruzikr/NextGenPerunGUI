import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Group} from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private apiService: ApiService
  ) { }

  getGroupById(id: number): Observable<Group> {
    return this.apiService.get(`json/groupsManager/getGroupById?id=${id}`);
  }

  getAllGroups(voId: number): Observable<Group[]> {
    return this.apiService.get(`json/groupsManager/getAllGroups?vo=${voId}`);
  }
}
