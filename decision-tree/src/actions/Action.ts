export interface Action {
  execute(context?: any): Promise<void>;
  toJSON(): any;
  next?: Action;
}
