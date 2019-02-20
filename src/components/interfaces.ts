export interface ISliderModel {
    minVal: number,
    maxVal: number,
    startValue: number,
    endValue: number,
    step: number,
    currentRoundValue: number,
    currentRoundEndValue: number,
    currentValue: number,
    currentMaxValue: number,
    calculateCoefficient (point: number): number,
    calculateValue (val: number, valueName: string): void | boolean
}

export interface ISliderView {
    runner1?: null | IRunnerView,
    runner2?: null | IRunnerView,
    tip1?: null | ITipView,
    tip2?: null | ITipView,
    track?: null | ITrackView,
    type: string,
    isTip: boolean,
    updateSlider(): void
}

export interface ISliderController {
    init(): void;
}

export interface SliderAppOptions {
    element?: JQuery,
    startValue?: number,
    endValue?: number,
    minVal?: number,
    maxVal?: number,
    type?: string,
    orientation?: string,
    step?: number,
    isTip?: boolean,
    isScale?: boolean,
    trackItemsQuantity?: number,
    sliderModel?: ISliderModel,
    sliderView?: ISliderView,
    sliderController?: ISliderController
}

export interface IRunnerView {
    el: JQuery,
    drawRunner (parent: JQuery, coefficient: number): void,
    setRunnerShiftX (e: JQuery.MouseDownEvent): void,
    setRunnerShiftY (e: JQuery.MouseDownEvent): void,
    setRunnerPosition (coefficient: number): void,
    moveRunner (e: JQuery.MouseMoveEvent): void
}

export interface ITrackView {
    drawTrack (parent: JQuery, coefficient: number, coefficientTwo: number): void,
    animateTrack (coefficient: number, pointName: string): void
}

export interface IScaleView {
    drawScale (parent: JQuery, minVal: number, maxVal: number, itemsQuantity: number): void
}

export interface ITipView {
    updateTip (val: number): void
}