/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.ico" {
    const content: string;
    // noinspection JSDuplicatedDeclaration
    export default content;
}

declare module "*.png" {
    const content: string;
    // noinspection JSDuplicatedDeclaration
    export default content;
}
