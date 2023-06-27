import { findTextAtCaret, isText } from "./utils"

interface Parameter {
    name: string
    arguments: string[]
}

interface FnNest {
    name: string,
    parameterIndex: number
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
    fnNest: FnNest[] = []
    backspaced: boolean = false
    suggestions: string[] = []

    constructor(datas: AutoCompFragment[], defaultComp: AutoCompFragment[]) {
        this.datas = datas
        this.default = defaultComp
    }

    getSuggestions(input?: string, caretPosition?: number): string[] {
        if (input && caretPosition) {
            let textAtCaret = findTextAtCaret(input, caretPosition)
            return this.suggestions.filter(str => str.startsWith(textAtCaret) && textAtCaret.length <= str.length)
        } else {
            return this.suggestions
        }
    }

    calcSuggestions(text: string, caretPosition: number | null, input?: string) {
        const trimmedText = text.trim();
        const charInput = input ?? "";

        if (trimmedText === "" || caretPosition === 0 || caretPosition === null) {
            this.addDefaultSuggestions();
            return;
        } 

        switch (charInput) {
            case "(":
            case '"':
            case "ArrowLeft":
            case "ArrowRight":
                //Inside function
                this.parseFnNest(text, caretPosition)
                this.suggestions = this.currentParameter() ?? this.suggestions
                return;
            case ",":
                this.parseFnNest(text, caretPosition)
                this.suggestions = this.nextParameter() ?? this.suggestions
                return;
            case ".":
            case ")":
                break
        }
        
        for (let i = caretPosition! - 1; i >= 0; i--) {
            switch (text[i]) {
                case "(":
                case '"':
                    //Inside function
                    this.parseFnNest(text, caretPosition)
                    this.suggestions = this.currentParameter() ?? this.suggestions
                    return;
                case ",":
                    this.parseFnNest(text, caretPosition)
                    this.suggestions = this.nextParameter() ?? this.suggestions
                    return;
                case ".":
                case ")":
                    break
                
            }
        }

        this.addDefaultSuggestions();
    }

    onInputHandler(text: string, caretPosition: number | null, input: string) {
        const trimmedText = text.trim();
        const charInput = input ?? "";
        
        if (trimmedText === "" || caretPosition === 0 || caretPosition === null) {
            return;
        } 

        if (this.backspaced === true && charInput !== "Backspace") {
            this.backspaced = false;
            return this.calcSuggestions(text, caretPosition, charInput)
           
        }

        switch (charInput) {
            case "(":
                if (!isText(text, caretPosition)) {
                    const fnName = findTextAtCaret(text, caretPosition, 1)
                    this.suggestions = this.startFn(fnName) ?? this.suggestions
                    return;
                }
                break;
            case ",":
                if (!isText(text, caretPosition)) {
                    this.suggestions = this.nextParameter() ?? this.suggestions
                    return;
                }
                break;
            case ")":
                if (!isText(text, caretPosition)) {
                    this.suggestions = this.endFn()
                    return;
                }
                break;
            case "Backspace":
                if (!isText(text, caretPosition)) {
                    this.backspaced = true
                }
                break;
            case "ArrowLeft":
            case "ArrowRight":
                return this.calcSuggestions(text, caretPosition, charInput)
        }
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
            this.addDefaultSuggestions()
            return null
        }
        let currentFn = this.fnNest[this.fnNest.length - 1]
        for (const data of this.datas) {
            if (data.name === currentFn.name && data.isFunction === true) {
                return data.parameters[this.fnNest[this.fnNest.length - 1].parameterIndex].arguments
            }
        }
        
        return null
    }

    private addDefaultSuggestions(): void {
        this.fnNest = [];
        this.backspaced = false;
        this.suggestions = []
        for (const data of this.default) {
            this.suggestions.push(data.name)
        }
    }

    private parseFnNest(text: string, caret?: number | null) {
        let fnNest: FnNest[] = []
        let fnName = ""
        let isString = false
        const len = caret ?? text.length
    
        for (let i = 0; i < len; i++) {
            if (!isString) {
                if (text[i] === "(") {
                    fnNest.push({
                        name: fnName,
                        parameterIndex: 0
                    })
                    fnName = ""
                } else if (text[i] === ")") {
                    fnNest.pop()
                } else if (text[i] === '"') {
                    isString = true
                } else if (text[i] === ",") {
                    fnNest[fnNest.length - 1].parameterIndex = fnNest[fnNest.length - 1].parameterIndex + 1
                } else {
                    fnName = fnName + text[i]
                }
            } else {
                if (text[i] === '"') {
                    isString = false
                } 
            }
        }
        this.fnNest = fnNest
    }
}


