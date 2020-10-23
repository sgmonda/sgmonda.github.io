---
layout: default
title: "This is an example post"
date: 2020-05-29
excerpt: Una situación de confinamiento es la oportunidad perfecta para encontrar formas de entretenimiento que puedan desarrollarse sin salir de casa.
---


Well. Finally got around to putting this old website together. Neat thing about it - powered by [Jekyll](http://jekyllrb.com) and I can use Markdown to author my posts. It actually is a lot easier than I thought it was going to be.

# Flebile Hyadasque audetis dat fatigant

## Fugit late

Lorem markdownum terrae, ast ingrate [postera precor](http://vires.org/) urguet
cupidoque manibus! Marem iussum: Ide tento ad obsequio, genitor diffudit contra
abies tristia silices Olympus, grates. Parentes ad ausum; ut venis Hectoris
dives seges lateri. Has [tectus](http://tum-qua.com/lacrimae.html) altam mori
silet sororem quem, iuvenali nomine, at erat calidumque potiere ferre.

## Sidera armisque manente petentem

Aut est late adhibent; pietas fuga, suas odium corpore: multo enim spargimur,
mentemque fures seditio! Functa Capetusque prima crudelis saetaeque domum
comitatur tamquam captus per sensit. Instructo manibus **pugnat** ast iamque
nobis, repressit terraque copia? Uvis tradat illa focus subito una sed iam
inpune, deus **maius**.

```javascript
import { FunctionComponent } from "react";

type Props = {
  options: { [key: string]: string };
  onChange: (value: string) => void;
  value: string;
  color?: string;
};

// @TODO Implement onChange()

const Dropdown: FunctionComponent<Props> = ({ options, value, onChange, color }) => {
  return (
    <div className="select">
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ background: color || undefined }}>
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;

```

## Ponere non dum

Vacet latent. Tempore tum ipsamque et maius fide visa undis comitant strepitum
docebo, non diemque tener; [et](http://www.telae-quam.net/iunxitlitora) regno
hic. Esse formae, exit movimus. Virtute ex tibi nunc reddebat, velocibus, ambit
longave quod huius. Minimam quem auxilium primum adspicit fiducia.

Aeneas faciesque tenebat raptae et certe **sentibus abstulit tecta** querno
videtur Lunae qui quam nigrum. An non fert umbrosum angues.

## Dedit cogis sed intulit dederat

Perdiderat ipsumque esses ad Andron freta prioribus utroque excedere eripe.
Secundo sentiet *verba hoc*. Dum latent copia **agunt simul** suas, suas illa
caputque retices agit ages! Ululasse sub referam cum sua velocius Interea esse
in exul, aquis coniecit viros adspicit.

## Animalia ramos timentem cupidine superata venabula transire

Aequi domus; cum valet, et mens erit tempore mane parte simillima forma; adiutus
indestrictus. Ventis efficerentque fronte *nihil armenti solus* prohibent
Cephalus arcet duc. Inquit arboris haerebat malae tenera in vobisque regia
optata Amnis rector extemplo videres iubendo praesagaque. Priamo quidque, nec
contra lupus solis longusque iurgia meruisse se quia cupio arbiter. Pedes
galeae, amorem utque si mihi **letataque si aut** fortes tenebris quam et,
pectoris.

Postquam enim mille osse, quis nec. Sues solita dici, deum et et non discedite
manebant inque. Nihil deserta carmina.
