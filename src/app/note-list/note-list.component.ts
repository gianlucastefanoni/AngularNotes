import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Note, defaultNote } from "../data/Note";
import { Router, RouterLink } from "@angular/router";
import { UserInterface } from "../data/UserInterface";
import { DataService } from "../data/data.service";

@Component({
    selector: "hw-note-list",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./note-list.component.html",
    styleUrl: "./note-list.component.css",
})
export class NoteListComponent implements OnInit {
    @Input() user!: UserInterface;
    newPath = "../assets/Group 1.svg";
    notes: Note[] = [defaultNote];

    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit() {
        const tempNotes = localStorage.getItem("notes");
        if (tempNotes !== null && tempNotes !== "null")
            this.notes = JSON.parse(tempNotes);
        else localStorage.setItem("notes", JSON.stringify(this.notes));
        console.log(tempNotes);
    }

    createNewNote() {
        const id = this.dataService.generateId(8);
        this.notes.push({
            id: id,
            title: "Title",
            author: this.user.username || "",
            content: "Content",
        });
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.router.navigateByUrl("/notes/" + id);
    }
}
