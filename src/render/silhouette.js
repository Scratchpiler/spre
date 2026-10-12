const intMin = (i, j) => j ^ ((i ^ j) & ((i - j) >> 31));
const intMax = (i, j) => i ^ ((i ^ j) & ((i - j) >> 31));

const alphaAt = (silhouette, x, y) => {
    if (x >= silhouette.width || y >= silhouette.height || x < 0 || y < 0) return 0;
    return silhouette.data[(((y * silhouette.width) + x) * 4) + 3];
};

const straightColorAt = (silhouette, xIn, yIn, dst) => {
    const x = intMax(0, intMin(xIn, silhouette.width - 1));
    const y = intMax(0, intMin(yIn, silhouette.height - 1));
    if (x >= silhouette.width || y >= silhouette.height || x < 0 || y < 0) return dst.fill(0);
    const offset = ((y * silhouette.width) + x) * 4;
    const data = silhouette.data;
    const alpha = data[offset + 3] / 255;
    dst[0] = data[offset] * alpha;
    dst[1] = data[offset + 1] * alpha;
    dst[2] = data[offset + 2] * alpha;
    dst[3] = data[offset + 3];
    return dst;
};

const premultipliedColorAt = (silhouette, xIn, yIn, dst) => {
    const x = intMax(0, intMin(xIn, silhouette.width - 1));
    const y = intMax(0, intMin(yIn, silhouette.height - 1));
    const offset = ((y * silhouette.width) + x) * 4;
    const data = silhouette.data;
    dst[0] = data[offset];
    dst[1] = data[offset + 1];
    dst[2] = data[offset + 2];
    dst[3] = data[offset + 3];
    return dst;
};

const corners = [new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4), new Uint8ClampedArray(4)];

export class Silhouette {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.data = null;
        this.premultiplied = false;
        this.colorAt = straightColorAt;
    }

    update(width, height, data, premultiplied = false) {
        this.width = width;
        this.height = height;
        if (!(width && height)) return;
        this.data = data;
        this.premultiplied = premultiplied;
        this.colorAt = premultiplied ? premultipliedColorAt : straightColorAt;
    }

    colorAtNearest(vec, dst) {
        if (!this.data) return dst.fill(0);
        return this.colorAt(this, Math.floor(vec[0] * (this.width - 1)), Math.floor(vec[1] * (this.height - 1)), dst);
    }

    colorAtLinear(vec, dst) {
        if (!this.data) return dst.fill(0);
        const x = vec[0] * (this.width - 1);
        const y = vec[1] * (this.height - 1);
        const x1D = x % 1;
        const y1D = y % 1;
        const x0D = 1 - x1D;
        const y0D = 1 - y1D;
        const xFloor = Math.floor(x);
        const yFloor = Math.floor(y);
        const x0y0 = this.colorAt(this, xFloor, yFloor, corners[0]);
        const x1y0 = this.colorAt(this, xFloor + 1, yFloor, corners[1]);
        const x0y1 = this.colorAt(this, xFloor, yFloor + 1, corners[2]);
        const x1y1 = this.colorAt(this, xFloor + 1, yFloor + 1, corners[3]);
        dst[0] = (x0y0[0] * x0D * y0D) + (x0y1[0] * x0D * y1D) + (x1y0[0] * x1D * y0D) + (x1y1[0] * x1D * y1D);
        dst[1] = (x0y0[1] * x0D * y0D) + (x0y1[1] * x0D * y1D) + (x1y0[1] * x1D * y0D) + (x1y1[1] * x1D * y1D);
        dst[2] = (x0y0[2] * x0D * y0D) + (x0y1[2] * x0D * y1D) + (x1y0[2] * x1D * y0D) + (x1y1[2] * x1D * y1D);
        dst[3] = (x0y0[3] * x0D * y0D) + (x0y1[3] * x0D * y1D) + (x1y0[3] * x1D * y0D) + (x1y1[3] * x1D * y1D);
        return dst;
    }

    isTouchingNearest(vec) {
        if (!this.data) return undefined;
        return alphaAt(this, Math.floor(vec[0] * (this.width - 1)), Math.floor(vec[1] * (this.height - 1))) > 0;
    }

    isTouchingLinear(vec) {
        if (!this.data) return undefined;
        const x = Math.floor(vec[0] * (this.width - 1));
        const y = Math.floor(vec[1] * (this.height - 1));
        return alphaAt(this, x, y) > 0 || alphaAt(this, x + 1, y) > 0 || alphaAt(this, x, y + 1) > 0 || alphaAt(this, x + 1, y + 1) > 0;
    }
}
