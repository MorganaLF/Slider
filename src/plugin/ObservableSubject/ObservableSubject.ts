class ObservableSubject {
  private observers: {(data?: any): void}[] = [];

  public addObserver(func: (data?: any) => void): void {
    this.observers.push(func);
  }

  public removeObserver(func: (data?: any) => void): void {
    this.observers = this.observers.filter(subscriber => subscriber !== func);
  }

  public notifyObservers(data?: any): void {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

export default ObservableSubject;
