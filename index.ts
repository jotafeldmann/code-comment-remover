import { CodeCommentRemover } from './CodeCommentRemover.ts'
import { ConsoleCodeWriter } from './ConsoleCodeWriter.ts'

const codeWriter = new ConsoleCodeWriter()
const commentRemover = new CodeCommentRemover(codeWriter)

const codes: string[] = [
`
// some comments
var result = a / b;
`,
`
/* This is a multi-line comment */const x = 5;
`,

`
/*
This is
a multi-line
comment
*/
const x = 5;
`
]

const results:string[] = []

codes.map((code, index) => {
        console.groupCollapsed(index)
        for (const char of code) {
            commentRemover.trimComment(char)
        }
        results.push(codeWriter.getSequence())
        codeWriter.clean()
        console.groupEnd()
    }
)

console.table(results)
