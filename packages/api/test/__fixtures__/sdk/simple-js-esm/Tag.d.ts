declare const Tag: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
            readonly format: "int64";
            readonly minimum: -9223372036854776000;
            readonly maximum: 9223372036854776000;
        };
        readonly name: {
            readonly type: "string";
        };
    };
    readonly title: "Tag";
    readonly "x-readme-ref-name": "Tag";
};
export default Tag;
