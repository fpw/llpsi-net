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

import { Word } from "./Word";
import { PrepositionData } from "../WordData";
import { Casus } from "../types/Casus";
import { splitNoEmpty } from "../common";

export class Preposition extends Word {
    private latin_: string;
    private cases_: Casus[] = [];
    private abbreviations_: string[] = [];
    
    public constructor(data: PrepositionData) {
        super(data, `${data.latin}`);
        this.latin_ = data.latin;
        this.abbreviations_ = splitNoEmpty(data.abbreviated, ';');
        this.cases_ = data.case.split(';').map(c => {
            switch (c) {
                case 'acc': return Casus.Accusative;
                case 'abl': return Casus.Ablative;
                default:    throw Error(`Invalid preposition case: ${c}`);
            }
        });
    }
    
    public get latin(): string {
        return this.latin_;
    }
    
    public get abbreviations(): string[] {
        return this.abbreviations_;
    }

    public get cases(): Casus[] {
        return this.cases_;
    }
}