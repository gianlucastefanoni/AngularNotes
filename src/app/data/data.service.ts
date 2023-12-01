import { Injectable } from "@angular/core";
import { UserInterface } from "./UserInterface";
import { Observable, catchError, map, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class DataService {
    constructor(private http: HttpClient) {}
    login(user: UserInterface): Observable<any> {
        return this.postRequest("/api/Login", user);
    }

    register(user: UserInterface): Observable<any> {
        return this.postRequest("/api/Register", user);
    }

    postRequest(url: string, object: any) {
        return this.http
            .post(url, object, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                }),
                responseType: "text",
                observe: "response",
            })
            .pipe(
                map((response: HttpResponse<any>) => {
                    if (response.status === 200) {
                        return response.body;
                    } else {
                        return throwError("Unexpected status code");
                    }
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(error);
                })
            );
    }

    generateId(length: number): string {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
}
