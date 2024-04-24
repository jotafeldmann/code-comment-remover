import { ICodeWriter } from './ICodeWriter'

export class ConsoleCodeWriter implements ICodeWriter {
    private sequence: string[] = []
    write(char: string): void {
        this.sequence.push(char)
    }
    getSequence(){
        return this.sequence.join('')
    }
    clean() {
        this.sequence = []
    }
}
