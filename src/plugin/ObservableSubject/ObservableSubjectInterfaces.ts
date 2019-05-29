export interface IObservableSubject {
  addObserver(func: (data?: any) => void): void;
  removeObserver(func: (data?: any) => void): void;
  notifyObservers(data?: any): void;
}
