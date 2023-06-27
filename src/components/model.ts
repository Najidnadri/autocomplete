import { findTextAtCaret, isText, parseFnNest } from "./utils"

interface Parameter {
    name: string
    arguments: string[]
}

/**
 * Interface to define each autocomplete fragment
 */
export interface AutoCompFragment {
    name: string,
    isFunction: boolean
    parameters: Parameter[]
}

/**
 * AutoComplete Task
 */
export class AutoComplete {
    datas: AutoCompFragment[]
    default: AutoCompFragment[]
    fnNest: {
        name: string,
        parameterIndex: number
    }[] = []
    backspaced: boolean = false

    constructor(datas: AutoCompFragment[], defaultComp: AutoCompFragment[]) {
        this.datas = datas
        this.default = defaultComp
    }

    calcSuggestions(text: string, caretPosition: number | null, input?: string): string[] | null {
        let suggestions: string[] | null = []
        const trimmedText = text.trim();
        const charInput = input ?? "";

        if (trimmedText === "" || caretPosition === 0 || caretPosition === null) {
            this.addDefaultSuggestions(suggestions);
            return suggestions;
        } 

        switch (charInput) {
            case "(":
            case '"':
            case "ArrowLeft":
            case "ArrowRight":
                //Inside function
                this.fnNest = parseFnNest(text, caretPosition)
                return this.currentParameter()
            case ",":
                this.fnNest = parseFnNest(text, caretPosition)
                return this.nextParameter()
            case ".":
            case ")":
                break
        }
        
        for (let i = caretPosition! - 1; i >= 0; i--) {
            switch (text[i]) {
                case "(":
                case '"':
                    //Inside function
                    this.fnNest = parseFnNest(text, caretPosition)
                    return this.currentParameter()
                case ",":
                    this.fnNest = parseFnNest(text, caretPosition)
                    return this.nextParameter()
                case ".":
                case ")":
                    break
                
            }
        }

        this.addDefaultSuggestions(suggestions);
        return suggestions;
    }

    onInputHandler(text: string, caretPosition: number | null, input: string): string[] | null {
        if (text.trim() === "" || caretPosition === 0 || caretPosition === null) {
            return null
        }

        if (this.backspaced === true && input !== "Backspace") {
            this.backspaced = false;
            return this.calcSuggestions(text, caretPosition, input)
           
        }

        switch (input) {
            case "(":
                if (!isText(text, caretPosition)) {
                    const fnName = findTextAtCaret(text, caretPosition, 1)
                    return this.startFn(fnName)
                }
                break;
            case ",":
                if (!isText(text, caretPosition)) {
                    return this.nextParameter()
                }
                break;
            case ")":
                if (!isText(text, caretPosition)) {
                    return this.endFn()
                }
                break;
            case "Backspace":
                if (!isText(text, caretPosition)) {
                    this.backspaced = true
                }
                break;
            case "ArrowLeft":
            case "ArrowRight":
                return this.calcSuggestions(text, caretPosition, input)
        }

        return null
    }

    private startFn(fnName: string): string[] | null {
        for (const data of this.datas) {
            if (data.name === fnName && data.isFunction === true) {
                this.fnNest.push({
                    name: data.name,
                    parameterIndex: 0
                })
                return data.parameters[0].arguments
            }
        }
        return null
    }

    private endFn(): string[] {
        this.fnNest.pop()
        return []
    }

    private nextParameter(): string[] | null {
        let currentFn = this.fnNest[this.fnNest.length - 1]
        for (const data of this.datas) {
            if (data.name === currentFn.name && data.isFunction === true) {
                this.fnNest[this.fnNest.length - 1].parameterIndex = this.fnNest[this.fnNest.length - 1].parameterIndex + 1
                return data.parameters[this.fnNest[this.fnNest.length - 1].parameterIndex].arguments
            }
        }
        
        return null
    }

    private currentParameter(): string[] | null {
        if (this.fnNest.length === 0) {
            let suggestion: string[] = []
            this.addDefaultSuggestions(suggestion)
            return suggestion
        }
        let currentFn = this.fnNest[this.fnNest.length - 1]
        for (const data of this.datas) {
            if (data.name === currentFn.name && data.isFunction === true) {
                return data.parameters[this.fnNest[this.fnNest.length - 1].parameterIndex].arguments
            }
        }
        
        return null
    }

    private addDefaultSuggestions(suggestions: string[]): void {
        this.fnNest = [];
        this.backspaced = false;
        for (const data of this.default) {
            suggestions.push(data.name);
        }
    }

}


