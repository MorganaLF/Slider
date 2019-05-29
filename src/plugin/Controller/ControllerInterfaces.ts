export type changeValueSettings = {
  eventType: string;
  value: number;
  coefficient: number;
};

export interface IController {
  init(): void;
  destroy(): void;
}
