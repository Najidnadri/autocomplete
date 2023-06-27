import type { AutoCompFragment } from "./model"

export const readDataFunction: AutoCompFragment = {
    name: "ReadData",
    isFunction: true,
    parameters: [
        {
            name: "table",
            arguments: ["test"]
        },
        {
            name: "column1",
            arguments: ["fieldA"],
        },
        {
            name: "column2",
            arguments: ["value"]
        },
        {
            name: "TableId",
            arguments: ["xidtest"]
        }
    ]
}

export const readMapperFunction: AutoCompFragment = {
    name: "ReadMapper",
    isFunction: true,
    parameters: [
        {
            name: "TableId",
            arguments: ["xidtest"]
        }
    ]
}

export const mapperFunction: AutoCompFragment = {
    name: "mapper",
    isFunction: true,
    parameters: [
        {
            name: "arg1",
            arguments: ["ReadMapper", "ReadData"]
        },
        {
            name: "arg2",
            arguments: ["ReadMapper", "ReadData"]
        },
    ]
}