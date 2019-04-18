export type TipViewOptions = {
  $element?: JQuery,
  $parent: JQuery,
  orientation: string,
};

export interface ITipView {
  updateTip(val: number): void;
}
