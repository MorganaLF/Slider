export type TipViewOptions = {
  $element?: null | JQuery,
  $parent: JQuery,
  orientation: string,
};

export interface ITipView {
  updateTip (val: number): void;
}
