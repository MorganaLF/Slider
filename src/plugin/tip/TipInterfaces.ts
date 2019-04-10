export type TipViewOptions = {
  $element?: null | JQuery,
  $parent: null | JQuery,
  orientation: string,
};

export interface ITipView {
  updateTip (val: number): void;
}
