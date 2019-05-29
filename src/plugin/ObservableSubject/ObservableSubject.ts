class ObservableSubject {
  private observers: {(data?: any): void}[] = [];

  addObserver(func: (data?: any) => void): void {
    this.observers.push(func);
  }

  removeObserver(func: (data?: any) => void): void {
    this.observers = this.observers.filter(subscriber => subscriber !== func);
  }

  notifyObservers(data?: any): void {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

export default ObservableSubject;
