export interface Session {
  id: string;
  title: string;
  start: Date;
  sessionExerciseIds: Array<string>;
}
