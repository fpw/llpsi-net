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

import React, { useRef, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import { WordDB } from '../../../models/WordDB';
import { FlashCardGame } from '../../../games/flashcard/FlashCardGame';
import { Box, Button, ButtonGroup, Collapse, FormControl, FormGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { FlashCardGameOptions } from '../../../games/flashcard/FlashCardGameOptions';
import { FlashCardChallenge } from '../../../games/flashcard/FlashCardChallenge';
import { getGrammarKnowledge } from '../../../models/GrammarKnowledge';
import { Preposition } from '../../../models/words/Preposition';
import { Pronoun } from '../../../models/words/Pronoun';
import { Casus } from '../../../models/types/Casus';
import { Numerus } from '../../../models/types/Numerus';
import { Genus } from '../../../models/types/Genus';
import { Word } from '../../../models/words/Word';
import { WordCard } from '../../words/WordCard';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Interjection } from '../../../models/words/Interjection';
import { GameOptions } from './GameOptions';

export interface GameViewProps {
    db: WordDB;
}

enum GameState {
    Options,
    Game,
}

export function FlashCardGameView(props: GameViewProps) {
    const [state, setState] = useState<GameState>(GameState.Options);
    const [score,setScore] = useState<number>(0);
    const [options, setOptions] = useState<FlashCardGameOptions>({
        knowledge: getGrammarKnowledge(props.db.maxChapter),
        vocabChapter: props.db.maxChapter,
    });
    const [game, setGame] = useState<FlashCardGame>(new FlashCardGame(props.db));    
    const [challenge, setChallenge] = useState<FlashCardChallenge>();
    const [previous,setPrevious] = useState<FlashCardChallenge>();
    const [casus,setCasus] = useState<Casus>(Casus.Nominative);

    function changeOptions(opts: FlashCardGameOptions) {
        setOptions(opts);
    }
    function onStart(cs:Casus) {
        setCasus(cs);
        setPrevious(game.createChallenge(options,cs));
        setChallenge(game.createChallenge(options,cs));        
        setState(GameState.Game);
        setScore(0)
    }

    function onNextGame() {
        setPrevious(challenge);
        setChallenge(game.createChallenge(options,casus));
    }

    function onCancel() {
        setOptions({
            knowledge: getGrammarKnowledge(props.db.maxChapter),
            vocabChapter: props.db.maxChapter,
        });
        setState(GameState.Options);
    }
    function incScore(){
        setScore(score+1);
    }
    function getScore(){
        return score;
    }
    function resetScore(){
        setScore(0);
    }

    return (
        <React.Fragment>
            <Typography component='h1' variant='h4'>AVTODIODORVS</Typography>
            { state == GameState.Options &&
                <GameOptions
                    db={props.db}
                    initial={options}
                    onChange={opts => changeOptions(opts)}
                    onDone={(casus:Casus) => onStart(casus)}
                />
            }
            { state == GameState.Game && previous && challenge &&
                <Game game={game} previous={previous} challenge={challenge}
                    onNext={() => onNextGame()}
                    onCancel={() => onCancel()}
                    incScore={() => incScore()}
                    resetScore={() => resetScore()}
                    getScore={() => getScore()}
                    key={new Date().getTime()}
                />
            }
        </React.Fragment>
    );
}

interface GameProps {
    game: FlashCardGame;
    previous: FlashCardChallenge;
    challenge: FlashCardChallenge;     
    onNext(): void;
    onCancel(): void;
    incScore():void;
    resetScore():void;
    getScore():number;
}

function Game(props: GameProps): JSX.Element {
    const challenge = props.challenge;
    const previous = props.previous;
    const whip=new Audio('https://upload.wikimedia.org/wikipedia/commons/c/c2/Whip-sound.ogg');

    function next() {
        props.onNext();
        props.incScore();
    }

    function reset() {
        props.onCancel();
    }
    function tuxtax() {
        //<!-- whip sound Mike Koenig, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons-->
        //https://upload.wikimedia.org/wikipedia/commons/c/c2/Whip-sound.ogg
        props.resetScore();
        whip.play();
    }
    const bg=(challenge.number==Numerus.Plural)?'yellow':'white';
    
    return (
        <React.Fragment>
            <Box mt={1}>
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableBody onClick={() => next()}>
                            <TableRow lang='la'>
                                <TableCell style={{width: '20%',fontWeight:'bold'}}>Answer</TableCell>
                                <TableCell style={{}}>{previous.answer}</TableCell>
                            </TableRow>
                            <TableRow lang='la'>
                                <TableCell style={{width: '20%',fontWeight:'bold'}}>Casus,Numerus</TableCell>
                                <TableCell style={{}}>{challenge.casus} {challenge.number}</TableCell>
                            </TableRow>
                            <TableRow lang='la'>
                                <TableCell style={{width: '20%',fontWeight:'bold'}}>Word</TableCell>
                                <TableCell style={{backgroundColor: bg}}>{challenge.word.lemma}</TableCell>
                            </TableRow>
                            <TableRow lang='la'>
                                <TableCell style={{width: '20%',fontWeight:'bold'}}>Score</TableCell>
                                <TableCell style={{}}>{props.getScore()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box mt={1}>
                <form noValidate autoCorrect='off' autoComplete='off' autoCapitalize='off' spellCheck='false'>
                    <ButtonGroup color='primary' variant='contained'>
                        <Button onClick={() => reset()}>SATIS</Button>
                    </ButtonGroup>
                    <ButtonGroup color='primary' variant='contained'>
                        <Button onClick={() => tuxtax()}>TVX TAX</Button>
                    </ButtonGroup>
                </form>
            </Box>
        </React.Fragment>
    );
}

