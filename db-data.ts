export const COURSES: any = {

    1: {
        titles: {
            description: 'Serverless Angular with Firebase Course',
            longDescription: 'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png',
        difficult: ['BEGINNER'],
        categories: ['serverless-angular']
    },

    2: {
        titles: {
            description: 'Angular Core Deep Dive',
            longDescription: 'A detailed walk-through of the most important part of Angular - the Core and Common modules'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
        difficult: ['INTERMEDIATE'],
        categories: ['serverless-angular']
    },

    3: {
        titles: {
            description: 'RxJs In Practice Course',
            longDescription: 'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
        difficult: ['INTERMEDIATE'],
        categories: ['serverless-angular']
    },

    4: {
        titles: {
            description: 'NgRx In Depth',
            longDescription: 'Learn the modern Ngrx Ecosystem, including Store, Effects, Router Store, Ngrx Entity, Dev Tools and Schematics.'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png',
        difficult: ['INTERMEDIATE'],
        categories: ['serverless-angular']
    },

    5: {
        titles: {
            description: 'Angular for Beginners',
            longDescription: 'Establish a solid layer of fundamentals, learn what\'s under the hood of Angular'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/angular2-for-beginners-small-v2.png',
        difficult: ['INTERMEDIATE'],
        categories: ['serverless-angular']
    },

    6: {
        titles: {
            description: 'Angular Security Course - Web Security Fundamentals',
            longDescription: 'Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.'
        },
        spec1: 'Specifica 1',
        spec2: 'Specifica 2',
        spec3: 'Specifica 3',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png',
        difficult: ['INTERMEDIATE'],
        categories: ['serverless-angular']
    }
};

export function findCourseById(courseId: number) {
    return COURSES[courseId];
}


