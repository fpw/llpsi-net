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

import { Declension, DeclensionInput } from "./Declension";
import { Casus } from "../types/Casus";
import { Numerus } from "../types/Numerus";

export class IrregularDeclension extends Declension {
    private data: DeclensionInput;

    public constructor(data: DeclensionInput) {
        super();
        this.data = data;
    }

    public get stem(): string {
        return 'irregular';
    }

    public decline(casus: Casus, numerus: Numerus): string | null {
        return 'irregular';
    }
}
