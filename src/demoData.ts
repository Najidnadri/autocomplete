import type { AutoCompFragment } from "./model"

export const readDataFunction: AutoCompFragment = {
    name: "ReadData",
    isFunction: true,
    parameters: [
        {
            name: "table",
            type: "string",
            arguments: ["test"]
        },
        {
            name: "column1",
            type: "string",
            arguments: ["fieldA"],
        },
        {
            name: "column2",
            type: "string",
            arguments: ["value"]
        },
        {
            name: "TableId",
            type: "string",
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
            type: "string",
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
            type: "function",
            arguments: ["ReadMapper", "ReadData"]
        },
        {
            name: "arg2",
            type: "function",
            arguments: ["ReadMapper", "ReadData"]
        },
    ]
}