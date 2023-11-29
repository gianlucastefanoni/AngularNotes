import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Note, defaultNote } from "../data/Note";
import { ActivatedRoute, Router } from "@angular/router";
import {
    HtmlEditorService,
    LinkService,
    RichTextEditorModule,
    ToolbarService,
} from "@syncfusion/ej2-angular-richtexteditor";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
    selector: "pm-note",
    standalone: true,
    imports: [CommonModule, FormsModule, RichTextEditorModule],
    templateUrl: "./note.component.html",
    styleUrl: "./note.component.css",
    providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class NoteComponent implements OnInit {
    notes: Note[] = [defaultNote, defaultNote];
    updatedNote: Note = defaultNote;
    id = "0";
    modifiable = false;
    public tools: object = {
        type: "Expand",
        items: [
            "Bold",
            "Italic",
            "Underline",
            "StrikeThrough",
            "FontName",
            "FontSize",
            "FontColor",
            "BackgroundColor",
            "LowerCase",
            "UpperCase",
            "|",
            "Formats",
            "Alignments",
            "OrderedList",
            "UnorderedList",
            "Outdent",
            "Indent",
            "|",
            "Undo",
            "Redo",
        ],
    };
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        const tempNotes = localStorage.getItem("notes");
        if (tempNotes !== null) this.notes = JSON.parse(tempNotes);
        this.id = String(this.route.snapshot.paramMap.get("id"));
        const tempNote = this.notes.find((note) => note.id === this.id);
        if (tempNote !== undefined) this.updatedNote = tempNote;
        this.modifiable =
            JSON.parse(localStorage.getItem("logged") || "{username: '' }")
                .username !== this.updatedNote.author;
    }

    updateNote() {
        const noteToUpdate = this.notes.find((note) => note.id === this.id);

        if (noteToUpdate) {
            Object.assign(noteToUpdate, this.updatedNote);
        } else {
            console.error(`Note with id ${this.id} not found.`);
        }
    }

    deleteNote() {
        console.log("delete");
        const newNotes = this.notes.filter((note) => note.id !== this.id);
        localStorage.setItem("notes", JSON.stringify(newNotes));
        this.router.navigateByUrl("/home");
    }

    onEnter(form: NgForm) {
        this.updatedNote.content = form.value.content;
        this.updateNote();
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.router.navigateByUrl("/home");
    }
}
