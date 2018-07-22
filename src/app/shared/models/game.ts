export class Game{
    constructor(
        public name: String,
        public startTime: Date,
        public endTime: Date,
        public duration: number,
        public steps: number
    ){}
}