"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inscription = void 0;
class Inscription {
    constructor(inscription_date, inscription_approved_date, inscription_approved, inscription_note, subject_name, subject_quarter, subject_professor, inscription_finished, inscription_class_hour, inscription_id, subject_id) {
        this.inscription_date = inscription_date;
        this.inscription_approved_date = inscription_approved_date;
        this.inscription_note = inscription_note;
        this.inscription_class_hour = inscription_class_hour;
        this.subject_name = subject_name;
        this.subject_quarter = subject_quarter;
        this.subject_professor = subject_professor;
        if (inscription_finished === 1) {
            this.inscription_finished = true;
        }
        else {
            this.inscription_finished = false;
        }
        if (inscription_approved === 1) {
            this.inscription_approved = true;
        }
        else {
            this.inscription_approved = false;
        }
        if (this.inscription_id !== null && this.inscription_id !== undefined) {
            this.inscription_id = inscription_id;
        }
        if (this.subject_id !== null && this.subject_id !== undefined) {
            this.subject_id = subject_id;
        }
    }
}
exports.Inscription = Inscription;
//# sourceMappingURL=inscription.js.map