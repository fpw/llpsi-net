/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2020 Folke Will <folko@solhost.org>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { randomElement, stripMacrons } from "../../models/common";
import { Casus } from "../../models/types/Casus";
import { Genus } from "../../models/types/Genus";
import { NounDeclension } from "../../models/types/NounDeclension";
import { Numerus } from "../../models/types/Numerus";
import { WordDB } from "../../models/WordDB";
import { Adjective } from "../../models/words/Adjective";
import { Interjection } from "../../models/words/Interjection";
import { Noun } from "../../models/words/Noun";
import { Preposition } from "../../models/words/Preposition";
import { Pronoun } from "../../models/words/Pronoun";
import { Word } from "../../models/words/Word";
import { FlashCardChallenge } from "./FlashCardChallenge";
import { FlashCardGameOptions } from "./FlashCardGameOptions";

export interface FlashCardGameState {
    opts: FlashCardGameOptions;

}

export class FlashCardGame {
    private db: WordDB;

    constructor(db: WordDB) {
        this.db = db;
    }

    public initState(opts: FlashCardGameOptions): FlashCardGameState {

        return {
            opts: opts,
        };
    }

    public createChallenge(opts: FlashCardGameOptions,casus:Casus): FlashCardChallenge {
        /*
        const casus = randomElement(Array.from(opts.knowledge.declensions.cases.keys()));
        switch (casus) {
            case Casus.Nominative:  return this.createNominative(opts);
            case Casus.Accusative:  return this.createAccusative(opts);
            case Casus.Genitive:    return this.createGenitive(opts);
            case Casus.Ablative:    return this.createAblative(opts);
            case Casus.Dative:      return this.createDative(opts);
            case Casus.Vocative:    return this.createVocative(opts);
            default:                throw Error(`Invalid casus ${casus}`);
        }*/
        const noun  = this.randomNoun(opts, casus);
        const num=(noun:Noun,casus:Casus):Numerus=>{
                if (noun.pluraleTantum) {
                    return Numerus.Plural;
                } else if (!opts.knowledge.declensions.cases.get(casus)?.numeri.has(Numerus.Plural)) {
                    return Numerus.Singular;
                } else if (casus == Casus.Nominative) {
                    return Numerus.Plural;
                } else {
                    return Math.random() < 0.5 ? Numerus.Singular : Numerus.Plural;
                };                
            };
        const numerus=num(noun,casus);
        var answer = noun.decline(casus, numerus);
        if(!answer){
            answer="I have no idea";
        }
        return {
            word:noun,
            casus:casus,
            number:numerus,
            answer:answer,
        };
    
    }
    private randomNoun(opts: FlashCardGameOptions, casus: Casus): Noun  {
        // first, find all nouns that could be used
        const filter = (noun: Noun): boolean => {
            if (noun.chapter > opts.vocabChapter) {
                return false;
            }

            if (noun.isGrammaticalTerm) {
                return false;
            }

            const decl = opts.knowledge.declensions;
            if (!decl.nounDeclensions.get(noun.declensionType)?.genera.has(noun.genus)) {
                return false;
            }

            if (!decl.cases.get(casus)?.genera.has(noun.genus)) {
                return false;
            }

            if (!decl.cases.get(casus)?.numeri.has(Numerus.Plural) && noun.pluraleTantum) {
                return false;
            }

            return true;
        };

        const filtered = this.db.words.nouns.filter(filter);

        // now try to equally choose between the declensions
        const decl = randomElement(Array.from(opts.knowledge.declensions.nounDeclensions.keys()));
        const noun = randomElement(filtered, n => {
            return n.declensionType == decl;
        });

        if (noun) {
            return noun;
        } else {
            // if not possible (for example, when vocabChapter < grammarChapter), use any declension
            const n2= randomElement(filtered);
            //  this was hacked to always produce some result to get rid of 
            //  returning undefineds
            if(n2)
                return n2;
            else
                return this.db.words.nouns[0];
        }
    }
}
