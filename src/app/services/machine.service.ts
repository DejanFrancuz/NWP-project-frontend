import {machineEnvironment, userEnvironment} from "../../environments/login.environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {Machine, MachineStatus, QueryRequest, Schedule, User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private readonly apiUrl = machineEnvironment.postApi;

  private authorities: String[] = [];

  constructor(private httpClient: HttpClient) { }

  getMachines (): Observable<Machine[]> {
    return this.httpClient.get<Machine[]>(`${this.apiUrl}/all`);
  }

  getMachineById (id: number): Observable<Machine> {
    return this.httpClient.get<Machine>(`${this.apiUrl}/getone`, { params: { id: id } });
  }

  deleteMachine(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete`, { params: { id: id}});
  }

  searchMachine(query: QueryRequest): Observable<Machine[]>{
    let params = new HttpParams()
    .set('name', query.name)
    .set('dateFrom', query.startDate.toString())
    .set('dateTo', query.endDate.toString());

  query.status.forEach(status => {
    params = params.append('status', status.toUpperCase());
  });

  console.log("wuery: ", query);
  console.log("params: ", params);

    return this.httpClient.get<Machine[]>(`${this.apiUrl}/search`, { params: params});
  }

  scheduleOperation(schedule: Schedule): Observable<any>{

    const timezoneOffset = new Date().getTimezoneOffset() / 60; // U satima

    schedule.executionDateTime = new Date(schedule.executionDateTime.getTime() - timezoneOffset * 60 * 60 * 1000);

    return this.httpClient.put<any>(`${this.apiUrl}/schedule`, schedule);
  }

  startMachine (machine: Machine): Observable<any>{
    return this.httpClient.put<any>(`${this.apiUrl}/start`, machine);
  }
  stopMachine (machine: Machine): Observable<any>{
    return this.httpClient.put<any>(`${this.apiUrl}/stop`, machine);
  }

  restartMachine (machine: Machine): Observable<any>{
    return this.httpClient.put<any>(`${this.apiUrl}/restart`, machine);
  }

  addMachine(username: string, status: MachineStatus, active: boolean): Observable<any> {
    const body = {
      username: username,
      status: status,
      active: active
    };

    return this.httpClient.post<any>(`${this.apiUrl}/add`,body).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
