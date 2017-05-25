import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {
    baseUrl = location.origin;
    allUserPollUrl: string = this.baseUrl + '/api/poll/all';
    addUserPollUrl: string = this.baseUrl + '/api/poll/new';
    editUserPollUrl: string = this.baseUrl + '/api/poll/edit';
    getAllPollsUrl: string = this.baseUrl + '/api/poll/public/all';
    getPollUrl: string = this.baseUrl + '/api/poll/public/all/';
    voteUrl: string = this.baseUrl + '/api/poll/public/vote';
    
    constructor( private _http: Http ) {}
    
    get_all_user_polls( token: string ): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post(this.allUserPollUrl, { "authToken": token }, options)
                    .map(this.extractData);
    }
    
    addNew( title: string, options: string ): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let headersOptions = new RequestOptions({ headers: headers });
        
        return this._http.post(this.addUserPollUrl, { "title": title, "options": options, "authToken": localStorage.getItem('token') }, headersOptions)
                    .map(this.extractData);
    }
    
    private extractData(res: Response) {
      let body = res.json();
      return body;
    }
    deletePoll(id) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let headersOptions = new RequestOptions({ headers: headers });
        return this._http.delete(this.allUserPollUrl + "?id=" + id + "&authToken=" + localStorage.getItem('token'), headersOptions)
                    .map(this.extractData);
    }
    
    editPoll(poll) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let headersOptions = new RequestOptions({ headers: headers });   
        return this._http.post(this.editUserPollUrl, { "pollID": poll.pollID, "title": poll.pollTitle, "options": poll.pollOptions, "authToken": localStorage.getItem('token') }, headersOptions)
                    .map(this.extractData);
    }
    getAllPolls(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.get(this.getAllPollsUrl, options)
                    .map(this.extractData);
    }
    getPoll(id) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.get(this.getPollUrl + id, options)
            .map(this.extractData);
    }
    vote(id, option) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.voteUrl, { "id": id, "option": option }, options)
            .map(this.extractData);
    }
}
