import { Subject } from 'rxjs/internal/Subject';
const subject = new Subject();

export const courseMarkedAsResolved = {
    //who triggering the subject and passing variable
    courseMarkedAsResolvedChange: val => subject.next(val),

    //Who is listening for this subject
    onCourseMarkedAsResolvedChange: () => subject.asObservable()
};