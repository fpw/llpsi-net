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

import { ADeclension } from "../declensions/ADeclension";
import { ConsDeclension } from "../declensions/ConsDeclension";
import { Declension, DeclensionInput } from "../declensions/Declension";
import { IMixedDeclension } from "../declensions/IMixedDeclension";
import { IPureDeclension } from "../declensions/IPureDeclension";
import { ODeclension } from "../declensions/ODeclension";
import { UDeclension } from "../declensions/UDeclension";
import { Casus } from "../types/Casus";
import { Genus } from "../types/Genus";
import { Numerus } from "../types/Numerus";
import { DeclensionOverrides, NounData } from "../WordData";
import { Word } from "./Word";

export class Noun extends Word {
    private declension: Declension;
    private genus_: string;

    public constructor(data: NounData) {
        super(data, `${data.latinNominative}`);
        this.genus_ = data.genus;
        this.declension = this.determineDeclension(data);
    }

    public decline(casus: Casus, numerus: Numerus): string | null {
        return this.declension.decline(casus, numerus);
    }

    public get genus(): string {
        return this.genus_;
    }

    private determineDeclension(data: NounData): Declension {
        const gen = data.latinGenitive;
        const input = this.nounToDeclension(data);

        if (data.pluraleTantum) {
            if (gen.endsWith('ārum')) {
                return new ADeclension(input);
            } else if (gen.endsWith('ōrum')) {
                return new ODeclension(input);
            } else if (gen.endsWith('uum')) {
                return new UDeclension(input);
            } else if (gen.endsWith('um')) {
                return this.determineConsDeclension(data, input);
            }
        } else {
            if (gen.endsWith('ae')) {
                return new ADeclension(input);
            } else if (gen.endsWith('ī')) {
                return new ODeclension(input);
            } else if (gen.endsWith('is')) {
                return this.determineConsDeclension(data, input);
            } else if (gen.endsWith('ūs')) {
                return new UDeclension(input);
            }
        }

        throw Error(`Unknown declension for ${data.latinNominative}, ${gen}`);
    }

    private nounToDeclension(data: NounData): DeclensionInput {
        let genus: Genus;
        switch (data.genus) {
            case 'm':   genus = Genus.Masculine; break;
            case 'f':   genus = Genus.Femininum; break;
            case 'n':   genus = Genus.Neuter; break;
            case 'm/f': genus = Genus.Masculine; break; // doesn't matter for the declension
            default:
                throw Error(`Unknown genus ${data.genus} on ${data.latinNominative}`);
        }

        const pluraleTantum = data.pluraleTantum ? true : false;

        return {
            nominative: data.latinNominative,
            genitiveConstruction: data.latinGenitive,
            genus: genus,
            pluraleTantum: pluraleTantum,
            overrides: this.getOverridesFor(data),
        };
    }

    private getOverridesFor(data: NounData): DeclensionOverrides | undefined {
        if (!data.overrides) {
            return undefined;
        }

        return JSON.parse(data.overrides);
    }

    private determineConsDeclension(data: NounData, input: DeclensionInput) {
        switch (data.iStemType) {
            case 'pure':    return new IPureDeclension(input);
            case 'mixed':   return new IMixedDeclension(input);
            default:        return new ConsDeclension(input);
        }
    }
}
