import { Injectable } from "@angular/core";
import { UserInterface } from "./UserInterface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class DataService {
    constructor(private http: HttpClient) {}
    postUserDataForm(user: UserInterface): Observable<any> {
        return this.http.post("https://putsreq.com/0eCO6nRcUtaRcWy6lmVb", user);
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
