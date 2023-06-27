interface FnNest {
    name: string
    parameterIndex: number
}


export function isText(text: string, caretPosition: number | null) {
    if (text.trim() === "" || caretPosition === 0 || caretPosition === null) {
        return false
    }
    const substring = text.substring(caretPosition);
    return /^"[^"]*"/.test(substring);
}


export function findTextAtCaret(text: string, caretPosition: number | null, skip: 1 | 2 = 1): string {
    if (text.trim() === "" || caretPosition === 0 || caretPosition === null) {
        return ""
    }
    const textFromCaret = text.substring(0, caretPosition ?? 0)
    const indexesOfText: number[] = Array.from(textFromCaret).reduce((indexes: number[], char: string, index: number) => char === '"' ? [...indexes, index] : indexes, []);
    if (isText(text, caretPosition)) {
        // text in string
        return text.substring(indexesOfText[indexesOfText.length - 1] + 1, caretPosition)
    } else {
        // text outside string
        let input = "";
        for (let i = caretPosition - skip; i >= 0; i--) {
            const currentChar: string = text[i];
            switch (currentChar) {
                case ".":
                case "(":
                case ")":
                case ",":
                    return input;
                    
                default:
                    input = currentChar + input
            }
        }
        return input
    }
}