const readline = require("readline");
const chalk = require('chalk');

class UserInput {
    constructor() {

        this._doneFn = null;
        this._form = null;
        this._currentQuestion = null;
        this._currentValidation = null;
        this._answers = {};

        this._Bind(this._ProcessAnswer);
        this._Bind(this._ValidateAnswer);
        this._Bind(this._End);

        this._rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        this._rl.on("close", this._End);

    }

    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    Start(p_form, p_doneFn, p_prefilledAnswers = null) {

        /*
        [ 
            { key:`q_0`, q:`Question ?` answers:[], default:`Default Answer` },
            { key:`q_1`, q:`Question ?` answers:[], onlyIf:(answers) => { return true; } },
        ]
        */

        this._doneFn = p_doneFn;
        this._form = p_form;
        if (p_prefilledAnswers) { this._answers = p_prefilledAnswers; }
        this._index = 0;
        this._ProcessNext();
    }

    _ProcessNext() {

        if (this._index >= this._form.length) {
            this._rl.close();
            return;
        }

        this._currentQuestion = this._form[this._index];
        this._index++;

        if (this._currentQuestion.onlyIf) {
            if (!this._currentQuestion.onlyIf(this._answers)) {
                this._ProcessNext();
                return;
            }
        }

        let d = this._currentQuestion.default;

        if (typeof d === 'function') {
            d = d(this._answers);
            this._currentQuestion.default = d;
        }

        if (!d && this._answers.hasOwnProperty(this._currentQuestion.key)) {
            d = this._answers[this._currentQuestion.key];
            this._currentQuestion.default = d;
        }

        let requireValidation = false;
        this._currentValidation = null;
        if (this._currentQuestion.validation) {
            requireValidation = true;
            this._currentValidation = this._currentQuestion.validation;
        }

        console.log(' ');
        let prefix = chalk.gray(`[${this._index}/${this._form.length}] `);


        if (requireValidation) {
            this._rl.question(`${prefix}${this._currentQuestion.q} ${d ? chalk.italic(`\n(default : '${d}')\n`) : `\n`}`, this._ValidateAnswer);
        } else {
            this._rl.question(`${prefix}${this._currentQuestion.q} ${d ? chalk.italic(`\n(default : '${d}')\n`) : `\n`}`, this._ProcessAnswer);
        }

    }

    _ValidateAnswer(p_answer) {
        let d = this._currentQuestion.default,
            a = d ? p_answer !== `` ? p_answer : d : p_answer;
        let result = this._currentQuestion.validation(a);
        if (result !== true) {
            console.log(chalk.yellow.italic(`ERR : ${result}\n`));
            this._index--;
        }else{
            this._answers[this._currentQuestion.key] = a;
        }
        this._ProcessNext();
    }

    _ProcessAnswer(p_answer) {
        let d = this._currentQuestion.default,
            a = d ? p_answer !== `` ? p_answer : d : p_answer;
        if (this._currentQuestion.sanitize) { a = this._currentQuestion.sanitize(a); }
        this._answers[this._currentQuestion.key] = a;
        this._ProcessNext();
    }

    _End() {
        this._doneFn(this._answers);
    }


}

module.exports = UserInput;