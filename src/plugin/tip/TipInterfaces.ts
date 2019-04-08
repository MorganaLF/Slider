export type TipViewOptions = {
  el?: null | JQuery,
  orientation: string,
};

export interface ITipView {
  updateTip (val: number): void;
}
