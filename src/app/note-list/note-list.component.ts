import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Note } from "../data/Note";
import { Router, RouterLink } from "@angular/router";
import { UserInterface } from "../data/UserInterface";
import { DataService } from "../data/data.service";
import { SafeHtmlPipe } from "../pipe/safe-html.pipe";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "hw-note-list",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, SafeHtmlPipe],
    templateUrl: "./note-list.component.html",
    styleUrl: "./note-list.component.css",
    encapsulation: ViewEncapsulation.None,
})
export class NoteListComponent implements OnInit {
    @Input() user!: UserInterface;
    newPath = "../assets/Group 1.svg";
    notes: Note[] = [];
    filteredNotes: Note[] = [];
    searchField = "";
    constructor(private dataService: DataService, private router: Router) {}

    ngOnInit() {
        const tempNotes = localStorage.getItem("notes");
        if (tempNotes !== null && tempNotes !== "null")
            this.notes = JSON.parse(tempNotes);
        else localStorage.setItem("notes", JSON.stringify(this.notes));
        this.onSearchChange();
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

    onSearchChange() {
        this.filteredNotes = this.notes.filter(
            (note) =>
                (note.title
                    ?.toLowerCase()
                    .includes(this.searchField.toLowerCase()) ||
                    note.content
                        ?.toLowerCase()
                        .includes(this.searchField.toLowerCase())) &&
                note.author === this.user.username
        );
    }
}
