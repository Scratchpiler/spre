import { EFFECTS, EFFECT_INFO, transformColor, transformPoint } from './effects.js';
import { Rectangle } from './rectangle.js';
import { m4, v3 } from './twgl.js';

const touchingPosition = v3.create();
const FLOATING_POINT_ERROR_ALLOWANCE = 1e-6;
const hullProjection = m4.ortho(-1, 1, -1, 1, -1, 1);

export function localPositionOf(drawable, vec) {
    const local = touchingPosition;
    const v0 = vec[0];
    const v1 = vec[1];
    const m = drawable.inverseMatrix;
    const d = (v0 * m[3]) + (v1 * m[7]) + m[15];
    local[0] = 0.5 - (((v0 * m[0]) + (v1 * m[4]) + m[12]) / d);
    local[1] = (((v0 * m[1]) + (v1 * m[5]) + m[13]) / d) + 0.5;
    if (Math.abs(local[0]) < FLOATING_POINT_ERROR_ALLOWANCE) local[0] = 0;
    if (Math.abs(local[1]) < FLOATING_POINT_ERROR_ALLOWANCE) local[1] = 0;
    if (drawable.enabledEffects !== 0 && local[0] >= 0 && local[0] < 1 && local[1] >= 0 && local[1] < 1) {
        transformPoint(drawable, local, local);
    }
    return local;
}

export class Drawable {
    constructor(id, group) {
        this.id = id;
        this.group = group;
        this.uniforms = { u_modelMatrix: m4.identity() };
        this.effectValues = {};
        for (const name of EFFECTS) {
            this.uniforms[EFFECT_INFO[name].uniformName] = EFFECT_INFO[name].converter(0);
            this.effectValues[name] = 0;
        }
        this.position = v3.create(0, 0);
        this.scaleVector = v3.create(100, 100);
        this.direction = 90;
        this.transformDirty = true;
        this.rotationMatrix = m4.identity();
        this.rotationTransformDirty = true;
        this.rotationAdjusted = v3.create();
        this.rotationCenterDirty = true;
        this.skinScale = v3.create(0, 0, 0);
        this.skinScaleDirty = true;
        this.inverseMatrix = m4.identity();
        this.inverseTransformDirty = true;
        this.visible = true;
        this.enabledEffects = 0;
        this.convexHullPoints = null;
        this.convexHullDirty = true;
        this.transformedHullPoints = null;
        this.transformedHullDirty = true;
        this.skinRef = null;
        this.isTouching = this.isTouchingNever;
    }

    get skin() {
        return this.skinRef;
    }

    set skin(newSkin) {
        if (this.skinRef === newSkin) return;
        this.skinRef?.drawables.delete(this);
        this.skinRef = newSkin;
        this.skinRef?.drawables.add(this);
        this.skinWasAltered();
    }

    get scale() {
        return [this.scaleVector[0], this.scaleVector[1]];
    }

    dispose() {
        this.skin = null;
    }

    setTransformDirty() {
        this.transformDirty = true;
        this.inverseTransformDirty = true;
        this.transformedHullDirty = true;
    }

    updatePosition(position) {
        if (this.position[0] !== position[0] || this.position[1] !== position[1]) {
            this.position[0] = Math.round(position[0]);
            this.position[1] = Math.round(position[1]);
            this.setTransformDirty();
        }
    }

    updateDirection(direction) {
        if (this.direction !== direction) {
            this.direction = direction;
            this.rotationTransformDirty = true;
            this.setTransformDirty();
        }
    }

    updateScale(scale) {
        if (this.scaleVector[0] !== scale[0] || this.scaleVector[1] !== scale[1]) {
            this.scaleVector[0] = scale[0];
            this.scaleVector[1] = scale[1];
            this.rotationCenterDirty = true;
            this.skinScaleDirty = true;
            this.setTransformDirty();
        }
    }

    updateVisible(visible) {
        if (this.visible !== visible) {
            this.visible = visible;
            this.convexHullDirty = true;
        }
    }

    updateEffect(name, rawValue) {
        const info = EFFECT_INFO[name];
        if (!info) return;
        this.effectValues[name] = rawValue;
        if (rawValue) this.enabledEffects |= info.mask;
        else this.enabledEffects &= ~info.mask;
        this.uniforms[info.uniformName] = info.converter(rawValue);
        if (info.shapeChanges) this.convexHullDirty = true;
    }

    calculateTransform() {
        if (this.rotationTransformDirty) {
            const rotation = (270 - this.direction) * Math.PI / 180;
            const c = Math.cos(rotation);
            const s = Math.sin(rotation);
            this.rotationMatrix[0] = c;
            this.rotationMatrix[1] = s;
            this.rotationMatrix[4] = -s;
            this.rotationMatrix[5] = c;
            this.rotationTransformDirty = false;
        }
        if (this.rotationCenterDirty && this.skin !== null) {
            const center = this.skin.rotationCenter;
            const size = this.skin.size;
            this.rotationAdjusted[0] = (center[0] - (size[0] / 2)) * this.scaleVector[0] / 100;
            this.rotationAdjusted[1] = ((center[1] - (size[1] / 2)) * this.scaleVector[1] / 100) * -1;
            this.rotationCenterDirty = false;
        }
        if (this.skinScaleDirty && this.skin !== null) {
            const size = this.skin.size;
            this.skinScale[0] = size[0] * this.scaleVector[0] / 100;
            this.skinScale[1] = size[1] * this.scaleVector[1] / 100;
            this.skinScaleDirty = false;
        }
        const model = this.uniforms.u_modelMatrix;
        const r = this.rotationMatrix;
        model[0] = this.skinScale[0] * r[0];
        model[1] = this.skinScale[0] * r[1];
        model[4] = this.skinScale[1] * r[4];
        model[5] = this.skinScale[1] * r[5];
        model[12] = (r[0] * this.rotationAdjusted[0]) + (r[4] * this.rotationAdjusted[1]) + this.position[0];
        model[13] = (r[1] * this.rotationAdjusted[0]) + (r[5] * this.rotationAdjusted[1]) + this.position[1];
        this.transformDirty = false;
    }

    get modelMatrix() {
        if (this.transformDirty) this.calculateTransform();
        return this.uniforms.u_modelMatrix;
    }

    needsConvexHullPoints() {
        return !this.convexHullPoints || this.convexHullDirty || this.convexHullPoints.length === 0;
    }

    setConvexHullPoints(points) {
        this.convexHullPoints = points;
        this.convexHullDirty = false;
        this.transformedHullPoints = points.map(() => v3.create());
        this.transformedHullDirty = true;
    }

    isTouchingNever() {
        return false;
    }

    isTouchingNearest(vec) {
        return this.skin.isTouchingNearest(localPositionOf(this, vec));
    }

    isTouchingLinear(vec) {
        return this.skin.isTouchingLinear(localPositionOf(this, vec));
    }

    getBounds(result = new Rectangle()) {
        if (this.needsConvexHullPoints()) throw new Error('Needs updated convex hull points before bounds calculation.');
        if (this.transformDirty) this.calculateTransform();
        return result.initFromPointsAABB(this.transformedHull());
    }

    getBoundsForBubble(result = new Rectangle()) {
        if (this.needsConvexHullPoints()) throw new Error('Needs updated convex hull points before bubble bounds calculation.');
        if (this.transformDirty) this.calculateTransform();
        const slice = 8;
        const points = this.transformedHull();
        const maxY = Math.max(...points.map(p => p[1]));
        return result.initFromPointsAABB(points.filter(p => p[1] > maxY - slice));
    }

    getAABB(result = new Rectangle()) {
        if (this.transformDirty) this.calculateTransform();
        return result.initFromModelMatrix(this.uniforms.u_modelMatrix);
    }

    getFastBounds(result) {
        return this.needsConvexHullPoints() ? this.getAABB(result) : this.getBounds(result);
    }

    transformedHull() {
        if (!this.transformedHullDirty) return this.transformedHullPoints;
        const size = this.skin.size;
        const halfXPixel = 1 / size[0] / 2;
        const halfYPixel = 1 / size[1] / 2;
        const tm = m4.multiply(this.uniforms.u_modelMatrix, hullProjection);
        for (let i = 0; i < this.convexHullPoints.length; i++) {
            const point = this.convexHullPoints[i];
            const dst = this.transformedHullPoints[i];
            dst[0] = 0.5 + (-point[0] / size[0]) - halfXPixel;
            dst[1] = (point[1] / size[1]) - 0.5 + halfYPixel;
            m4.transformPoint(tm, dst, dst);
        }
        this.transformedHullDirty = false;
        return this.transformedHullPoints;
    }

    updateMatrix() {
        if (this.transformDirty) this.calculateTransform();
        if (this.inverseTransformDirty) {
            const inverse = this.inverseMatrix;
            m4.copy(this.uniforms.u_modelMatrix, inverse);
            inverse[10] = 1;
            m4.inverse(inverse, inverse);
            this.inverseTransformDirty = false;
        }
    }

    updateCPURenderAttributes() {
        this.updateMatrix();
        if (this.skin) {
            this.skin.updateSilhouette(this.scaleVector);
            this.isTouching = this.skin.useNearest(this.scaleVector, this) ? this.isTouchingNearest : this.isTouchingLinear;
        } else {
            this.isTouching = this.isTouchingNever;
        }
    }

    skinWasAltered() {
        this.rotationCenterDirty = true;
        this.skinScaleDirty = true;
        this.convexHullDirty = true;
        this.setTransformDirty();
    }

    sampleColor4b(vec, dst, effectMask) {
        const local = localPositionOf(this, vec);
        if (local[0] < 0 || local[1] < 0 || local[0] > 1 || local[1] > 1) {
            dst[0] = 0;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            return dst;
        }
        const color = this.skin.silhouette.colorAtNearest(local, dst);
        if (this.enabledEffects === 0) return color;
        return transformColor(this, color, effectMask);
    }
}
