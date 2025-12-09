import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../assets/data/quizz_questions.json"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title:string = ""

  questions:any
  selectedQuestion:any
  
  answers:string[] = []
  selectedAnswer = ""

  questionIndex = 0
  questionMaxIndex = 0

  finished:boolean = false

  result:string = ""

  constructor(){}
  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.selectedQuestion = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length - 1
      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  choice(alias:string){
    this.answers.push(alias)
    console.log(this.answers)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex]
    }else{
      this.finished = true
      const finalAnswer:string = await this.checkResult(this.answers)
      this.selectedAnswer = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
