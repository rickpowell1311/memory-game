import { newId } from "./id";
import { sampleSize } from "lodash";

export class Game {
    constructor(
        private id: string, 
        private gamer_tag: string, 
        private items?: Array<Item>,
        private answers?: Array<Item>,
        private score?: number) { }

    static initialize(gamer_tag: string, number_of_items = 10): Game {
        let game = new Game(`gm-${newId()}`, gamer_tag, Game.generateItems(number_of_items));
        return game;
    }

    complete(items: Array<Item>) {
        const orderedAnswers = items
            .sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0));

        const matches = (this.items ?? [])
            .sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0))
            .filter(x => items.some(y => Item.isDescriptionMatch(x, y)));

        this.score = 0;
        for (let i = 0; i < matches.length; i++) {
            let answerScore = 1;

            if (items.length > 1) {
                // Only see if ordering is correct if more than one answer is given
                answerScore += Item.isDescriptionMatch(matches[i], orderedAnswers[i]) ? 2 : 0;
            }

            this.score += answerScore;
        }

        this.answers = items;
    }

    public getId() {
        return this.id;
    }

    public getGamerTag() {
        return this.gamer_tag;
    }

    public getItems() {
        return this.items;
    }

    public getAnswers() {
        return this.answers;
    }

    public getScore() {
        return this.score;
    }

    public getStatus() {
        return this.answers && this.answers.length > 0 ? "Completed" : "Started";
    }

    private static generateItems(number: number) {
        const dictionary = [
            "Apple",
            "Banana",
            "Carrot",
            "Dog",
            "Egg",
            "Frog",
            "Grape",
            "Horse",
            "Ice",
            "Jelly",
            "Kite",
            "Lemon",
            "Mango",
            "Nail",
            "Orange",
            "Pineapple",
            "Quail",
            "Rabbit",
            "Strawberry",
            "Tiger",
            "Umbrella",
            "Violin",
            "Water",
            "Xylophone",
            "Yoyo",
            "Zebra"
        ];

        return sampleSize(dictionary, number)
            .map((x, i) => new Item(i, x));
    }
}

export class Item {
    constructor(public order: number, public description: string) {
    }

    static isDescriptionMatch(a: Item, b: Item) {
        return a.description.trim().toLowerCase() === b.description.trim().toLowerCase();
    }
}