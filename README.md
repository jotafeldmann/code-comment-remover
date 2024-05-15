# Code Comment Remover [![Node.js CI](https://github.com/jotafeldmann/code-comment-remover/actions/workflows/node.js.yml/badge.svg)](https://github.com/jotafeldmann/code-comment-remover/actions/workflows/node.js.yml)

- Author: [Jorge Feldmann](https://github.com/jotafeldmann)
- Repo: [https://github.com/jotafeldmann/code-comment-remover](https://github.com/jotafeldmann/code-comment-remover)
- Test online: [https://replit.com/@jotafeldmann/code-comment-remover#index.ts > shell > npm test > npm start](https://replit.com/@jotafeldmann/code-comment-remover#index.ts)

## Scope of the task

Implement a feature that removes the comments from a TypeScript code using the following interfaces.

``` 
interface ICodeCommentRemover { 
 trimComment(c: string): void; 
}

interface ICodeWriter { 
 write(c: string): void; 
}
```
 
The method `trimComment` receives the TypeScript code char by char. 
The interface `ICodeWriter` may have several implementations for different outputs (text file, console). This implementation is not in the scope of your task. 

### Scenario

Input:
``` 
// some comments 
var result = a / b; 
```
Output:
``` 
var result = a / b;
```

## How to

- Install Node: [install NVM then install any Node LTS >= 20](https://github.com/nvm-sh/nvm)

- Local setup
```bash
npm install
```

- Simple run
```bash
npm start
```

- Run tests
```bash
npm test
```

- Run tests and watch for modifications
```bash
npm run test/watch
```

## Technical details

- [Node.js native test runner](https://nodejs.org/api/test.html)
- [ts-node: TypeScript execution and REPL for node.js](https://typestrong.org/ts-node/)
