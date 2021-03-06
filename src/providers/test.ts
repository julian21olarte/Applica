import { Test, TestPresentation, RawTest } from './../shared/interfaces/test.interface';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../shared/interfaces/question.interface';
import 'rxjs/add/operator/map';
import { User } from 'src/shared/interfaces/user.interface';
import localTest from "../shared/tests/v1.json"; // TODO: change this
const crypto = window.crypto;

/*
  Generated class for the TestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestProvider {

    private test: Test;
    constructor(public http: HttpClient, public database: AngularFirestore, public platform: Platform) {
        console.log('Hello TestProvider Provider');
        this.loadTest();
    }

    public async loadTest() {
        let rawTest: { questions: { forEach: (arg0: (item: any) => void) => void; }; };
        this.test = <Test> { questions: [] }
        rawTest = localTest;
        
        rawTest.questions.forEach(item => {
            item.questions.forEach(question => {
                let newQuestion = <Question> {
                    category: item.category,
                    question: question.question,
                    image: question.image
                }
                this.test.questions.push(newQuestion)
            })
        })
    }

    public getTest(): Test {
        console.log(this.test)
        return this.test;
    }

    private getRandomValue() {
        let arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        return arr[0] * Math.pow(2,-32);
    }

    public getShuffleTest(): Test {
        this.loadTest();
        this.test.questions.sort(() => .5 - this.getRandomValue())
        let sortedTest = <Test> { questions: this.test.questions };
        sortedTest.questions.forEach((question, index) => question.index = index+1);
        return sortedTest;
    }
 
    public evaluateTest(test: Array<Question>) {
        let values = [];
        test.forEach(question => {
            const currentCategory = values.find(value => value.category === question.category);
            if (currentCategory) {
                currentCategory.value += question.answer;
            } else {
                values.push({ category: question.category, value: question.answer });
            }
        });

        let valuesMap = new Map();
        values.sort((a, b) => b.value - a.value)
        values = values
            .slice(0, 3)
            .map(value => {
                valuesMap.set(value.category, value.value)
                return value.category;
            });

        return this.database
            .collection('typologies')
            .valueChanges()
            // take only the first value emited, avoid infinite loops if the collection is updadted after
            .take(1)
            .map((typologies: any) => {
                let finalCareers = [];
                typologies.forEach(typology => {
                    const name: string = typology.name;
                    const careers: Array<any> = typology.careers;
                    const description: string = typology.description;
                    finalCareers.push({ match: this.getMatchCareers(name, valuesMap), name, careers, description });
                });

                return finalCareers
                    .sort((a, b) => b.match - a.match)
                    .slice(0, 3);
            });
    }

    private getMatchCareers(name: string, values: Map<string, number>): number {
        return values.get(name) || 0
    }

    public createPresentationByUser(user: User): TestPresentation {
        let presentation = <TestPresentation> {
            uid: user.uid,
            date: new Date(),
            results: user.results
        }
        return presentation;
    }

}