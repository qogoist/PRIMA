namespace Snake3D {
    import ƒ = FudgeCore;

    export interface CollisionSphere extends ƒ.Node {
        radius: number;

        collidesWith(_target: CollisionSphere): boolean;
    }
}