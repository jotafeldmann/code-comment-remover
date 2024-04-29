import { ICodeWriter } from './ICodeWriter.ts'
import { ICodeCommentRemover } from './ICodeCommentRemover.ts'

const COMMENT_MAYBE = '/'
const COMMENT_MULTI_LINE_MAYBE = '*'

const COMMENT_SINGLE_LINE = COMMENT_MAYBE + COMMENT_MAYBE
const COMMENT_SINGLE_LINE_END = '\n'
const COMMENT_MULTI_LINE = COMMENT_MAYBE + COMMENT_MULTI_LINE_MAYBE
const COMMENT_MULTI_LINE_END = COMMENT_MULTI_LINE_MAYBE + COMMENT_MAYBE
const RESET = ''

type Char = string


export class CodeCommentRemover implements ICodeCommentRemover {
    private inComment: string = RESET
    private previousChar: string = RESET
    constructor(private codeWriter: ICodeWriter) { }

    trimComment(char: Char): void {
        if (this.isCommentEnding(char)) {
            this.commentReset()
            return
        }

        if (this.isCommentEndingMaybe(char)) {
            this.previousChar = char
            return
        }

        if (this.isCommentSection()) {
            return
        }

        if (this.isCommentSingleLine(char)) {
            this.inComment = COMMENT_SINGLE_LINE
            this.previousChar = RESET
            return
        }

        if (this.isCommentMultiLine(char)) {
            this.inComment = COMMENT_MULTI_LINE
            this.previousChar = RESET
            return
        }

        if (this.isCommentMaybe(char)) {
            this.previousChar = char
            return
        }

        if (this.isCommentFalsePositive()) {
            this.codeWriter.write(this.previousChar)
        }

        this.writeChar(char)
    }

    private isCommentEndingMaybe(char: Char): boolean {
        return this.isCommentEndingMaybeChar(char) && !!this.inComment
    }

    private isCommentEndingMaybeChar(char: Char): boolean {
        return char === COMMENT_MULTI_LINE_MAYBE
    }

    private writeChar(char: Char): void {
        this.codeWriter.write(char)
        this.previousChar = char
    }

    private isCommentSingleLine(char: Char): boolean {
        return (this.previousChar + char) === COMMENT_SINGLE_LINE
    }

    private isCommentSingleLineEnding(char: Char): boolean {
        return char === COMMENT_SINGLE_LINE_END && this.inComment === COMMENT_SINGLE_LINE
    }
    
    private isCommentMultiLine(char: Char): boolean {
        return (this.previousChar + char) === COMMENT_MULTI_LINE
    }

    private isCommentMultiLineEnding(char: Char): boolean {
        return this.inComment === COMMENT_MULTI_LINE && (this.previousChar + char) === COMMENT_MULTI_LINE_END
    }

    private isCommentEnding(char: Char): boolean {
        return this.isCommentSingleLineEnding(char) || this.isCommentMultiLineEnding(char)
    }

    private isCommentMaybe(char: Char): boolean {
        return this.isCommentMaybeChar(char) && this.inComment == RESET
    }

    private isCommentMaybeChar(char: Char): boolean {
        return char === COMMENT_MAYBE || char === COMMENT_MULTI_LINE_MAYBE
    }

    private isCommentFalsePositive(): boolean {
        return this.isCommentMaybeChar(this.previousChar)
    }

    private isCommentSection(): boolean {
        return !!this.inComment
    }

    private commentReset(): void {
        this.inComment = RESET
        this.previousChar = RESET
    }
}
