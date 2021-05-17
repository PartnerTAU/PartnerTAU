
import { Subject } from 'rxjs/internal/Subject';
const subject = new Subject();

export const loginConfirmed = {
    subjectTrigger: val => subject.next(),
    onSubjectTrigged: () => subject.asObservable()
};