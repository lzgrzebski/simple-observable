import {fromEvent, map, filter} from '../lib/Observable';

const clickMeBtn = document.getElementById('btn');

const obs = fromEvent(clickMeBtn, 'click');

obs.pipe(
    map(x => x.pageY),
    map(x => x * 3),
    filter(x => x < 40),
).subscribe(e => {
    console.log('ahu', e);
});
