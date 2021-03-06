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
import { checkAdjDecl, findAdjective, loadAdjectives } from './AdjectiveHelpers';

before(() => {
    loadAdjectives();
});

describe('Us-A-Um-declension', () => {
    it('basic rule should decline correctly in singular', () => {
        const word = findAdjective('longus');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['longus', 'longa',  'longum'],
            accusative: ['longum', 'longam', 'longum'],
            genitive:   ['longī',  'longae', 'longī'],
            dative:     ['longō',  'longae', 'longō'],
            ablative:   ['longō',  'longā',  'longō'],
            vocative:   ['longe',  'longa',  'longum'],
        });
    });

    it('basic rule should decline correctly in plural', () => {
        const word = findAdjective('longus');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['longī',    'longae',   'longa'],
            accusative: ['longōs',   'longās',   'longa'],
            genitive:   ['longōrum', 'longārum', 'longōrum'],
            dative:     ['longīs',   'longīs',   'longīs'],
            ablative:   ['longīs',   'longīs',   'longīs'],
            vocative:   ['longī',    'longae',   'longa'],
        });
    });

    it('-cher rule should decline correctly in singular', () => {
        const word = findAdjective('pulcher');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['pulcher',  'pulchra',  'pulchrum'],
            accusative: ['pulchrum', 'pulchram', 'pulchrum'],
            genitive:   ['pulchrī',  'pulchrae', 'pulchrī'],
            dative:     ['pulchrō',  'pulchrae', 'pulchrō'],
            ablative:   ['pulchrō',  'pulchrā',  'pulchrō'],
            vocative:   ['pulcher',  'pulchra',  'pulchrum'],
        });
    });

    it('-cher rule should decline correctly in plural', () => {
        const word = findAdjective('pulcher');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['pulchrī',    'pulchrae',   'pulchra'],
            accusative: ['pulchrōs',   'pulchrās',   'pulchra'],
            genitive:   ['pulchrōrum', 'pulchrārum', 'pulchrōrum'],
            dative:     ['pulchrīs',   'pulchrīs',   'pulchrīs'],
            ablative:   ['pulchrīs',   'pulchrīs',   'pulchrīs'],
            vocative:   ['pulchrī',    'pulchrae',   'pulchra'],
        });
    });

    it('plurale tantum should decline correctly in plural', () => {
        const word = findAdjective('cēterī');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['cēterī',    'cēterae',   'cētera'],
            accusative: ['cēterōs',   'cēterās',   'cētera'],
            genitive:   ['cēterōrum', 'cēterārum', 'cēterōrum'],
            dative:     ['cēterīs',   'cēterīs',   'cēterīs'],
            ablative:   ['cēterīs',   'cēterīs',   'cēterīs'],
            vocative:   ['cēterī',    'cēterae',   'cētera'],
        });
    });

    it('meus exception should decline correctly in singular', () => {
        const word = findAdjective('meus');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['meus', 'mea',  'meum'],
            accusative: ['meum', 'meam', 'meum'],
            genitive:   ['meī',  'meae', 'meī'],
            dative:     ['meō',  'meae', 'meō'],
            ablative:   ['meō',  'meā',  'meō'],
            vocative:   ['mī',   'mea',  'meum'],
        });
    });

    it('alter should decline correctly in singular', () => {
        const word = findAdjective('alter');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['alter',       'altera',   'alterum'],
            accusative: ['alterum',     'alteram',  'alterum'],
            genitive:   ['alterīus',    'alterīus', 'alterīus'],
            dative:     ['alterī',      'alterī',   'alterī'],
            ablative:   ['alterō',      'alterā',   'alterō'],
            vocative:   ['alter',       'altera',   'alterum'],
        });
    });

    it('alter should decline correctly in plural', () => {
        const word = findAdjective('alter');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['alterī',      'alterae',      'altera'],
            accusative: ['alterōs',     'alterās',      'altera'],
            genitive:   ['alterōrum',   'alterārum',    'alterōrum'],
            dative:     ['alterīs',     'alterīs',      'alterīs'],
            ablative:   ['alterīs',     'alterīs',      'alterīs'],
            vocative:   ['alterī',      'alterae',      'altera'],
        });
    });

    it('uterque should decline correctly in singular', () => {
        const word = findAdjective('uterque');
        checkAdjDecl(word, Numerus.Singular, {
            nominative: ['uterque',      'utraque',   'utrumque'],
            accusative: ['utrumque',     'utramque',  'utrumque'],
            genitive:   ['utrīusque',    'utrīusque', 'utrīusque'],
            dative:     ['utrīque',      'utrīque',   'utrīque'],
            ablative:   ['utrōque',      'utrāque',   'utrōque'],
            vocative:   ['uterque',      'utraque',   'utrumque'],
        });
    });

    it('uterque should decline correctly in plural', () => {
        const word = findAdjective('uterque');
        checkAdjDecl(word, Numerus.Plural, {
            nominative: ['utrīque',      'utraeque',      'utraque'],
            accusative: ['utrōsque',     'utrāsque',      'utraque'],
            genitive:   ['utrōrumque',   'utrārumque',    'utrōrumque'],
            dative:     ['utrīsque',     'utrīsque',      'utrīsque'],
            ablative:   ['utrīsque',     'utrīsque',      'utrīsque'],
            vocative:   ['utrīque',      'utraeque',      'utraque'],
        });
    });
});
