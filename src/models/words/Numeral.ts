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
import { NumeralData } from "../WordData";

export class Numeral extends Word {
    private latin_: string;
    private number_: number;

    public constructor(data: NumeralData) {
        super(data, `${data.latin}`);
        this.latin_ = data.latin;
        this.number_ = Number.parseInt(data.number);
    }

    public get latin(): string {
        return this.latin_;
    }

    public get english(): string {
        return this.number.toString();
    }

    public get german(): string {
        return this.number.toString();
    }

    public get number(): number {
        return this.number_;
    }
}
