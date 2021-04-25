/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2021 Folke Will <folko@solhost.org>
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

import { Data, Typeinfo } from "./LaVerb";

interface Declension {
    nom?: string[];
    gen?: string[];
    dat?: string[];
    acc?: string[];
    abl?: string[];
};

interface PersonConj {
    s1?: string[];
    s2?: string[];
    s3?: string[];
    p1?: string[];
    p2?: string[];
    p3?: string[];
    infinitive?: string[];
};

interface TempusConj {
    present?: PersonConj;
    imperfect?: PersonConj;
    future?: PersonConj;
    perfect?: PersonConj;
    pluperfect?: PersonConj;
    futureperfect?: PersonConj;
};

interface ModeConj {
    indicative: TempusConj;
    subjunctive: TempusConj;
    imperative: TempusConj;
};

interface Participle {
    presentActive?: string[];
    futureActive?: string[];
    futurePassive?: string[];
    perfectPassive?: string[];
};

export interface VerbConjugation {
    lemma: string;
    active: ModeConj;
    passive: ModeConj;
    gerund: Declension;
    supine: Declension;
    participles: Participle;
    type: string;
};

export function laVerbToConjugation(data: Data, info: Typeinfo): VerbConjugation {
    return {
        lemma: info.lemma,
        type: info.conj_type,
        active: {
            indicative: {
                present: {
                    s1: getForm(data.forms, '1s_pres_actv_indc'),
                    s2: getForm(data.forms, '2s_pres_actv_indc'),
                    s3: getForm(data.forms, '3s_pres_actv_indc'),
                    p1: getForm(data.forms, '1p_pres_actv_indc'),
                    p2: getForm(data.forms, '2p_pres_actv_indc'),
                    p3: getForm(data.forms, '3p_pres_actv_indc'),
                    infinitive: getForm(data.forms, 'pres_actv_inf'),
                },
                imperfect: {
                    s1: getForm(data.forms, '1s_impf_actv_indc'),
                    s2: getForm(data.forms, '2s_impf_actv_indc'),
                    s3: getForm(data.forms, '3s_impf_actv_indc'),
                    p1: getForm(data.forms, '1p_impf_actv_indc'),
                    p2: getForm(data.forms, '2p_impf_actv_indc'),
                    p3: getForm(data.forms, '3p_impf_actv_indc'),
                },
                future: {
                    s1: getForm(data.forms, '1s_futr_actv_indc'),
                    s2: getForm(data.forms, '2s_futr_actv_indc'),
                    s3: getForm(data.forms, '3s_futr_actv_indc'),
                    p1: getForm(data.forms, '1p_futr_actv_indc'),
                    p2: getForm(data.forms, '2p_futr_actv_indc'),
                    p3: getForm(data.forms, '3p_futr_actv_indc'),
                    infinitive: getForm(data.forms, 'futr_actv_inf'),
                },
                perfect: {
                    s1: getForm(data.forms, '1s_perf_actv_indc'),
                    s2: getForm(data.forms, '2s_perf_actv_indc'),
                    s3: getForm(data.forms, '3s_perf_actv_indc'),
                    p1: getForm(data.forms, '1p_perf_actv_indc'),
                    p2: getForm(data.forms, '2p_perf_actv_indc'),
                    p3: getForm(data.forms, '3p_perf_actv_indc'),
                    infinitive: getForm(data.forms, 'perf_actv_inf'),
                },
                pluperfect: {
                    s1: getForm(data.forms, '1s_plup_actv_indc'),
                    s2: getForm(data.forms, '2s_plup_actv_indc'),
                    s3: getForm(data.forms, '3s_plup_actv_indc'),
                    p1: getForm(data.forms, '1p_plup_actv_indc'),
                    p2: getForm(data.forms, '2p_plup_actv_indc'),
                    p3: getForm(data.forms, '3p_plup_actv_indc'),
                },
                futureperfect: {
                    s1: getForm(data.forms, '1s_futp_actv_indc'),
                    s2: getForm(data.forms, '2s_futp_actv_indc'),
                    s3: getForm(data.forms, '3s_futp_actv_indc'),
                    p1: getForm(data.forms, '1p_futp_actv_indc'),
                    p2: getForm(data.forms, '2p_futp_actv_indc'),
                    p3: getForm(data.forms, '3p_futp_actv_indc'),
                }
            },
            subjunctive: {
                present: {
                    s1: getForm(data.forms, '1s_pres_actv_subj'),
                    s2: getForm(data.forms, '2s_pres_actv_subj'),
                    s3: getForm(data.forms, '3s_pres_actv_subj'),
                    p1: getForm(data.forms, '1p_pres_actv_subj'),
                    p2: getForm(data.forms, '2p_pres_actv_subj'),
                    p3: getForm(data.forms, '3p_pres_actv_subj'),
                },
                imperfect: {
                    s1: getForm(data.forms, '1s_impf_actv_subj'),
                    s2: getForm(data.forms, '2s_impf_actv_subj'),
                    s3: getForm(data.forms, '3s_impf_actv_subj'),
                    p1: getForm(data.forms, '1p_impf_actv_subj'),
                    p2: getForm(data.forms, '2p_impf_actv_subj'),
                    p3: getForm(data.forms, '3p_impf_actv_subj'),
                },
                perfect: {
                    s1: getForm(data.forms, '1s_perf_actv_subj'),
                    s2: getForm(data.forms, '2s_perf_actv_subj'),
                    s3: getForm(data.forms, '3s_perf_actv_subj'),
                    p1: getForm(data.forms, '1p_perf_actv_subj'),
                    p2: getForm(data.forms, '2p_perf_actv_subj'),
                    p3: getForm(data.forms, '3p_perf_actv_subj'),
                },
                pluperfect: {
                    s1: getForm(data.forms, '1s_plup_actv_subj'),
                    s2: getForm(data.forms, '2s_plup_actv_subj'),
                    s3: getForm(data.forms, '3s_plup_actv_subj'),
                    p1: getForm(data.forms, '1p_plup_actv_subj'),
                    p2: getForm(data.forms, '2p_plup_actv_subj'),
                    p3: getForm(data.forms, '3p_plup_actv_subj'),
                },
            },
            imperative: {
                present: {
                    s2: getForm(data.forms, '2s_pres_actv_impr'),
                    p2: getForm(data.forms, '2p_pres_actv_impr'),
                },
                future: {
                    s2: getForm(data.forms, '2s_futr_actv_impr'),
                    s3: getForm(data.forms, '3s_futr_actv_impr'),
                    p2: getForm(data.forms, '2p_futr_actv_impr'),
                    p3: getForm(data.forms, '3p_futr_actv_impr'),
                },
            }
        },
        passive: {
            indicative: {
                present: {
                    s1: getForm(data.forms, '1s_pres_pasv_indc'),
                    s2: getForm(data.forms, '2s_pres_pasv_indc'),
                    s3: getForm(data.forms, '3s_pres_pasv_indc'),
                    p1: getForm(data.forms, '1p_pres_pasv_indc'),
                    p2: getForm(data.forms, '2p_pres_pasv_indc'),
                    p3: getForm(data.forms, '3p_pres_pasv_indc'),
                    infinitive: getForm(data.forms, 'pres_pasv_inf'),
                },
                imperfect: {
                    s1: getForm(data.forms, '1s_impf_pasv_indc'),
                    s2: getForm(data.forms, '2s_impf_pasv_indc'),
                    s3: getForm(data.forms, '3s_impf_pasv_indc'),
                    p1: getForm(data.forms, '1p_impf_pasv_indc'),
                    p2: getForm(data.forms, '2p_impf_pasv_indc'),
                    p3: getForm(data.forms, '3p_impf_pasv_indc'),
                },
                future: {
                    s1: getForm(data.forms, '1s_futr_pasv_indc'),
                    s2: getForm(data.forms, '2s_futr_pasv_indc'),
                    s3: getForm(data.forms, '3s_futr_pasv_indc'),
                    p1: getForm(data.forms, '1p_futr_pasv_indc'),
                    p2: getForm(data.forms, '2p_futr_pasv_indc'),
                    p3: getForm(data.forms, '3p_futr_pasv_indc'),
                    infinitive: getForm(data.forms, 'futr_pasv_inf'),
                },
                perfect: {
                    infinitive: getForm(data.forms, 'perf_pasv_inf'),
                },
            },
            subjunctive: {
                present: {
                    s1: getForm(data.forms, '1s_pres_pasv_subj'),
                    s2: getForm(data.forms, '2s_pres_pasv_subj'),
                    s3: getForm(data.forms, '3s_pres_pasv_subj'),
                    p1: getForm(data.forms, '1p_pres_pasv_subj'),
                    p2: getForm(data.forms, '2p_pres_pasv_subj'),
                    p3: getForm(data.forms, '3p_pres_pasv_subj'),
                },
                imperfect: {
                    s1: getForm(data.forms, '1s_impf_pasv_subj'),
                    s2: getForm(data.forms, '2s_impf_pasv_subj'),
                    s3: getForm(data.forms, '3s_impf_pasv_subj'),
                    p1: getForm(data.forms, '1p_impf_pasv_subj'),
                    p2: getForm(data.forms, '2p_impf_pasv_subj'),
                    p3: getForm(data.forms, '3p_impf_pasv_subj'),
                },
            },
            imperative: {
                present: {
                    s2: getForm(data.forms, '2s_pres_pasv_impr'),
                    p2: getForm(data.forms, '2p_pres_pasv_impr'),
                },
                future: {
                    s2: getForm(data.forms, '2s_futr_pasv_impr'),
                    s3: getForm(data.forms, '3s_futr_pasv_impr'),
                    p2: getForm(data.forms, '2p_pres_pasv_impr'),
                    p3: getForm(data.forms, '3p_futr_pasv_impr'),
                },
            }
        },
        gerund: {
            nom: getForm(data.forms, 'ger_nom'),
            gen: getForm(data.forms, 'ger_gen'),
            dat: getForm(data.forms, 'ger_dat'),
            acc: getForm(data.forms, 'ger_acc'),
            abl: getForm(data.forms, 'ger_abl'),
        },
        supine: {
            acc: getForm(data.forms, 'sup_acc'),
            abl: getForm(data.forms, 'sup_abl'),
        },
        participles: {
            presentActive: getForm(data.forms, 'pres_actv_ptc'),
            futureActive: getForm(data.forms, 'futr_actv_ptc'),
            futurePassive: getForm(data.forms, 'futr_pasv_ptc'),
            perfectPassive: getForm(data.forms, 'perf_pasv_ptc'),
        }
    };
}

function getForm(forms: Map<string, string[]>, key: string): string[] | undefined {
    return forms.get(key);
}
