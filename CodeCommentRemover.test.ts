import { describe, it, beforeEach, mock } from 'node:test'
import assert from 'node:assert'

import { ICodeWriter } from './ICodeWriter.ts'
import { ICodeCommentRemover } from './ICodeCommentRemover.ts'
import { CodeCommentRemover } from './CodeCommentRemover.ts'

class MockCodeWriter implements ICodeWriter {
    private result:string[] = []
    
    write(arg: string): void {
        this.result.push(arg)
    }

    getResult(): string {
        return this.result.join('')
    }
}


describe('CodeCommentRemover', () => {
    let codeCommentRemover: ICodeCommentRemover;
    let mockCodeWriter: MockCodeWriter;

    beforeEach(() => {
        mockCodeWriter = new MockCodeWriter()
        codeCommentRemover = new CodeCommentRemover(mockCodeWriter)
    })

    it('should handle code with no comments', () => {
        const code = 'const x = 5;'
        const expectedOutput = 'const x = 5;'
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }
        
        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })

    it('should remove single line comments', () => {
        const code = '// This is a single line comment\nconst x = 5;'
        const expectedOutput = 'const x = 5;'
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }

        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })

    it('should remove multi-line comments', () => {
        const code = '/* This is\na multi-line\ncomment */\nconst x = 5;'
        const expectedOutput = '\nconst x = 5;'
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }
        
        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })

    it('should handle code with escaped slashes', () => {
        const code = `const str = "\\/\\/ This is not a comment";`
        const expectedOutput = `const str = "\\/\\/ This is not a comment";`
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }
        
        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })

    it('should handle code with comments inside strings', () => {
        const code = `const str = "// This is not a comment";`
        const expectedOutput = `const str = "// This is not a comment";`
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }
        
        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })

    it('should handle code with multi-line comments inside strings', () => {
        const code = `const str = "/* This is not a comment */";`
        const expectedOutput = `const str = "/* This is not a comment */";`
        for (let i = 0; i < code.length; i++) {
            codeCommentRemover.trimComment(code[i])
        }
        
        const result = mockCodeWriter.getResult()
        assert.strictEqual(result, expectedOutput)
    })
})

