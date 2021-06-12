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

import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormGroup, FormLabel, Slider } from '@material-ui/core';
import { FlashCardGameOptions } from '../../../games/flashcard/FlashCardGameOptions';
import { getGrammarKnowledge } from '../../../models/GrammarKnowledge';
import { WordDB } from '../../../models/WordDB';
import { Casus } from '../../../models/types/Casus';

export interface OptionsProps {
    db: WordDB;
    initial: FlashCardGameOptions;
    onChange(options: FlashCardGameOptions): void;
    onDone(casus:Casus): void;
}

export function GameOptions(props: OptionsProps) {
    const [options, setOptions] = useState<FlashCardGameOptions>(props.initial);

    function changeGrammar(chapter: number) {
        setOptions(old => ({ ...old, knowledge: getGrammarKnowledge(chapter) }));
    }

    function changeVocab(chapter: number) {
        setOptions(old => ({ ...old, vocabChapter: chapter }));
    }

    useEffect(() => {
        props.onChange(options);
    }, [options]);
    return (
        <Box p={1}>
            <form >
                <FormGroup>
                    <FormControl margin='normal'>
                        <FormLabel>Vocabulary up to chapter</FormLabel>
                        <Slider
                            defaultValue={props.db.maxChapter}
                            valueLabelDisplay='on'
                            getAriaValueText={value => value.toString()}
                            step={1} min={1} max={props.db.maxChapter} marks
                            onChange={(_, value) => changeVocab(value as number)} />
                    </FormControl>
                    <FormControl margin='normal'>
                        <FormLabel>Grammar up to chapter</FormLabel>
                        <Slider
                            defaultValue={props.db.maxChapter}
                            valueLabelDisplay='on'
                            getAriaValueText={value => value.toString()}
                            step={1} min={1} max={props.db.maxChapter} marks
                            onChange={(_, value) => changeGrammar(value as number)} />
                    </FormControl>
                </FormGroup>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Nominative)}>Nominativvs!</Button>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Accusative)}>Accvsativvs!</Button>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Genitive)}>Genetivvs!</Button>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Ablative)}>Ablativvs!</Button>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Dative)}>Dativvs!</Button>
                <Button type='submit' variant='contained' color='primary' onClick={() => props.onDone(Casus.Vocative)}>Vocativvs!</Button>
            </form>
        </Box>
    );
}
/*

*/
