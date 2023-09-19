import express, { Application, Request, Response, NextFunction } from 'express';

const add = (a: number, b: number): number => a + b;

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`sum of 3,4 is ${add(3, 4)}`);
});

// interface and types
interface UserType {
  name: string;
  age?: number; // undefined or optional
  add?(): number; // function
  education: string | number; // union operator
  height?: number | null;
}
const user: UserType = {
  name: 'Ashiq',
  age: 30,
  education: 'CSE',
};
router.get('/user', (req: Request, res: Response, next: NextFunction) => {
  res.send(`name : ${user.name}<br>education : ${user.education}`);
});

// type aliases
type ID = string;
type SomeData = string | number | null | undefined | string[] | object;
const userId: ID = '123';
const someData: SomeData = '123';

router.get('/user-id', (req: Request, res: Response, next: NextFunction) => {
  res.send(`userId : ${userId}, someData : ${someData}`);
});

// void type
const deposit = (a: number): void => {
  console.log('deposited', a);
};
router.get(
  '/fucntion-void',
  (req: Request, res: Response, next: NextFunction) => {
    deposit(100);
    res.send('deposit');
  }
);

// never
const doSomething = (): never => {
  throw 'willl never react end';
};
router.get('/never', (req: Request, res: Response, next: NextFunction) => {
  doSomething();
  res.send('never');
});

// type assertion (convert type)
const score: any = 10;
const unknownScore: unknown = '45';
const overallScore1: string = score;
const overallScore2: number = unknownScore as number;

const pageNumber: string = '1';
const numericPageNumber: number = pageNumber as unknown as number;

router.get('/assertion', (req: Request, res: Response, next: NextFunction) => {
  res.send(`
	overallScore1 : ${overallScore1}<br>
	overallScore2 : ${overallScore2}<br>
	numericPageNumber : ${numericPageNumber}<br>
	`);
});

// generic
// const addId = <T>(obj: T)
// below T should be an object
const addId = <T extends object>(obj: T) => {
  const id = Math.random().toString(16);
  return {
    ...obj,
    id,
  };
};

const user2 = {
  name: 'jhon',
};

router.get('/generic', (req: Request, res: Response, next: NextFunction) => {
  const result = addId(user2);
  console.log(result);
  res.send('generic');
});

// generic example 2
interface ColorInterface<T> {
  name: string;
  data: T;
}
const color: ColorInterface<{ meta: string }> = {
  name: 'orange',
  data: {
    meta: 'bright color',
  },
};
const color2: ColorInterface<string[]> = {
  name: 'orange',
  data: ['bringt', 'color'],
};
router.get('/generic-2', (req: Request, res: Response, next: NextFunction) => {
  console.log(color, color2);
  res.send('generic-2');
});

// generic example 3
interface ColorInterface2<T, V> {
  name: string;
  data: T;
  meta: V;
}
const color3: ColorInterface2<{ meta: string }, string> = {
  name: 'orange',
  data: {
    meta: 'bright color',
  },
  meta: 'bar',
};
const color4: ColorInterface2<string[], number> = {
  name: 'orange',
  data: ['bringt', 'color'],
  meta: 2,
};
router.get('/generic-3', (req: Request, res: Response, next: NextFunction) => {
  console.log(color3, color4);
  res.send('generic-3');
});

// enums
/* 0,1,2
enum Status {
	NotStarted,
	InProgress,
	Done
}
*/
enum Status {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Done = 'done',
}

let notStartedStatus: Status = Status.NotStarted;
notStartedStatus = Status.Done;

interface Task {
  id: string;
  status: Status;
}
const task: Task = {
  id: '123',
  status: Status.InProgress,
};

router.get('/enums', (req: Request, res: Response, next: NextFunction) => {
  console.log(notStartedStatus, task);
  res.send('statuses');
});

// module.exports = router;
export default router;
