export class Rectangle {
    constructor() {
        this.left = -Infinity;
        this.right = Infinity;
        this.bottom = -Infinity;
        this.top = Infinity;
    }

    initFromBounds(left, right, bottom, top) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        return this;
    }

    initFromPointsAABB(points) {
        this.left = Infinity;
        this.right = -Infinity;
        this.top = -Infinity;
        this.bottom = Infinity;
        for (let i = 0; i < points.length; i++) {
            const x = points[i][0];
            const y = points[i][1];
            if (x < this.left) this.left = x;
            if (x > this.right) this.right = x;
            if (y > this.top) this.top = y;
            if (y < this.bottom) this.bottom = y;
        }
        return this;
    }

    initFromModelMatrix(m) {
        const m30 = m[12];
        const m31 = m[13];
        const x = Math.abs(0.5 * m[0]) + Math.abs(0.5 * m[4]);
        const y = Math.abs(0.5 * m[1]) + Math.abs(0.5 * m[5]);
        this.left = -x + m30;
        this.right = x + m30;
        this.top = y + m31;
        this.bottom = -y + m31;
        return this;
    }

    intersects(other) {
        return this.left <= other.right && other.left <= this.right && this.top >= other.bottom && other.top >= this.bottom;
    }

    clamp(left, right, bottom, top) {
        this.left = Math.max(this.left, left);
        this.right = Math.min(this.right, right);
        this.bottom = Math.max(this.bottom, bottom);
        this.top = Math.min(this.top, top);
        this.left = Math.min(this.left, right);
        this.right = Math.max(this.right, left);
        this.bottom = Math.min(this.bottom, top);
        this.top = Math.max(this.top, bottom);
    }

    snapToInt() {
        this.left = Math.floor(this.left);
        this.right = Math.ceil(this.right);
        this.bottom = Math.floor(this.bottom);
        this.top = Math.ceil(this.top);
    }

    get width() {
        return Math.abs(this.left - this.right);
    }

    get height() {
        return Math.abs(this.top - this.bottom);
    }

    static intersect(a, b, result = new Rectangle()) {
        result.left = Math.max(a.left, b.left);
        result.right = Math.min(a.right, b.right);
        result.top = Math.min(a.top, b.top);
        result.bottom = Math.max(a.bottom, b.bottom);
        return result;
    }

    static union(a, b, result = new Rectangle()) {
        result.left = Math.min(a.left, b.left);
        result.right = Math.max(a.right, b.right);
        result.top = Math.max(a.top, b.top);
        result.bottom = Math.min(a.bottom, b.bottom);
        return result;
    }
}
