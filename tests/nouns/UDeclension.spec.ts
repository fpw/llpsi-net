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

import 'mocha';
import { Numerus } from '../../src/models/types/Numerus';
import { checkNounDecl, findNoun, loadNouns } from './NounHelpers';

before(() => {
    loadNouns();
});

describe('U-declension', () => {
    it('-us rule should decline correctly in singular', () => {
        const word = findNoun('manus');
        checkNounDecl(word, Numerus.Singular, {
            nominative: 'manus',
            accusative: 'manum',
            genitive:   'manūs',
            dative:     'manuī',
            ablative:   'manū',
            vocative:   'manus',
        });
    });

    it('-is neuter rule should decline correctly in plural', () => {
        const word = findNoun('manus');
        checkNounDecl(word, Numerus.Plural, {
            nominative: 'manūs',
            accusative: 'manūs',
            genitive:   'manuum',
            dative:     'manibus',
            ablative:   'manibus',
            vocative:   'manūs',
        });
    });

    it('Plurale tantum rule should decline correctly in plural', () => {
        const word = findNoun('īdūs');
        checkNounDecl(word, Numerus.Plural, {
            nominative: 'īdūs',
            accusative: 'īdūs',
            genitive:   'īduum',
            dative:     'īdibus',
            ablative:   'īdibus',
            vocative:   'īdūs',
        });
    });

    it('arcus exception should decline correctly in plural', () => {
        const word = findNoun('arcus');
        checkNounDecl(word, Numerus.Plural, {
            nominative: 'arcūs',
            accusative: 'arcūs',
            genitive:   'arcuum',
            dative:     'arcubus',
            ablative:   'arcubus',
            vocative:   'arcūs',
        });
    });

    it('neuter should decline correctly in singular', () => {
        const word = findNoun('cornū');
        checkNounDecl(word, Numerus.Singular, {
            nominative: 'cornū',
            accusative: 'cornū',
            genitive:   'cornūs',
            dative:     'cornū',
            ablative:   'cornū',
            vocative:   'cornū',
        });
    });

    it('neuter should decline correctly in plural', () => {
        const word = findNoun('cornū');
        checkNounDecl(word, Numerus.Plural, {
            nominative: 'cornua',
            accusative: 'cornua',
            genitive:   'cornuum',
            dative:     'cornibus',
            ablative:   'cornibus',
            vocative:   'cornua',
        });
    });
});
