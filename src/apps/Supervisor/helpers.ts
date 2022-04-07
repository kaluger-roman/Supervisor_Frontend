export class Timer {
    private last: number = performance.now()

    constructor(private minTime?: number, private maxTime?: number) {}

    spent() {
        return performance.now() - this.last
    }

    update() {
        this.last = performance.now()
    }

    checkRangeUpperMin() {
        return this.spent() > (this.minTime || 0)
    }

    checkRangeUpperMax() {
        return this.spent() > (this.maxTime || 0)
    }
}
