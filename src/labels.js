const PHRASES = {
    event_whenflagclicked: 'when flag clicked',
    event_whenthisspriteclicked: 'when this sprite clicked',
    event_whenstageclicked: 'when stage clicked',
    event_whenbroadcastreceived: 'when I receive [BROADCAST_OPTION]',
    event_whenkeypressed: 'when [KEY_OPTION] key pressed',
    event_whenbackdropswitchesto: 'when backdrop switches to [BACKDROP]',
    event_whengreaterthan: 'when [WHENGREATERTHANMENU] >',
    event_broadcast: 'broadcast',
    event_broadcastandwait: 'broadcast and wait',
    control_start_as_clone: 'when I start as a clone',
    control_forever: 'forever',
    control_repeat: 'repeat',
    control_repeat_until: 'repeat until',
    control_while: 'while',
    control_for_each: 'for each [VARIABLE]',
    control_if: 'if',
    control_if_else: 'if else',
    control_wait: 'wait',
    control_wait_until: 'wait until',
    control_stop: 'stop [STOP_OPTION]',
    control_create_clone_of: 'create clone',
    control_delete_this_clone: 'delete this clone',
    data_setvariableto: 'set [VARIABLE]',
    data_changevariableby: 'change [VARIABLE]',
    data_addtolist: 'add to [LIST]',
    data_deleteoflist: 'delete of [LIST]',
    data_deletealloflist: 'delete all of [LIST]',
    data_insertatlist: 'insert into [LIST]',
    data_replaceitemoflist: 'replace item of [LIST]',
    data_showvariable: 'show variable [VARIABLE]',
    data_hidevariable: 'hide variable [VARIABLE]',
    motion_movesteps: 'move',
    motion_gotoxy: 'go to x y',
    motion_goto: 'go to',
    motion_glidesecstoxy: 'glide to x y',
    motion_glideto: 'glide to',
    motion_changexby: 'change x',
    motion_changeyby: 'change y',
    motion_setx: 'set x',
    motion_sety: 'set y',
    motion_turnright: 'turn right',
    motion_turnleft: 'turn left',
    motion_pointindirection: 'point in direction',
    motion_pointtowards: 'point towards',
    motion_ifonedgebounce: 'if on edge, bounce',
    looks_say: 'say',
    looks_sayforsecs: 'say for secs',
    looks_think: 'think',
    looks_thinkforsecs: 'think for secs',
    looks_switchcostumeto: 'switch costume',
    looks_nextcostume: 'next costume',
    looks_switchbackdropto: 'switch backdrop',
    looks_show: 'show',
    looks_hide: 'hide',
    looks_seteffectto: 'set [EFFECT] effect',
    looks_changeeffectby: 'change [EFFECT] effect',
    looks_setsizeto: 'set size',
    looks_changesizeby: 'change size',
    looks_gotofrontback: 'go to [FRONT_BACK] layer',
    looks_goforwardbackwardlayers: 'go [FORWARD_BACKWARD] layers',
    sensing_askandwait: 'ask and wait',
    sensing_resettimer: 'reset timer',
    pen_clear: 'erase all',
    pen_stamp: 'stamp',
    pen_penDown: 'pen down',
    pen_penUp: 'pen up',
    sound_play: 'start sound',
    sound_playuntildone: 'play sound until done',
};

const INFIX = {
    operator_add: '+', operator_subtract: '-', operator_multiply: '*', operator_divide: '/', operator_mod: 'mod',
    operator_equals: '=', operator_lt: '<', operator_gt: '>', operator_and: 'and', operator_or: 'or',
};

const REPORTERS = {
    data_itemoflist: 'item', data_lengthoflist: 'length of', data_itemnumoflist: 'item # of', data_listcontainsitem: 'contains',
    operator_join: 'join', operator_letter_of: 'letter', operator_length: 'length', operator_contains: 'contains',
    operator_round: 'round', operator_random: 'pick random', operator_mathop: '',
    motion_xposition: 'x position', motion_yposition: 'y position', motion_direction: 'direction', looks_size: 'size',
    looks_costumenumbername: 'costume', looks_backdropnumbername: 'backdrop',
    sensing_keypressed: 'key pressed?', sensing_touchingobject: 'touching', sensing_touchingcolor: 'touching color',
    sensing_mousex: 'mouse x', sensing_mousey: 'mouse y', sensing_mousedown: 'mouse down?', sensing_timer: 'timer',
    sensing_answer: 'answer', sensing_of: 'of', sensing_current: 'current', sensing_distanceto: 'distance to', sensing_username: 'username',
};

const BRANCHES = new Set(['SUBSTACK', 'SUBSTACK2', 'custom_block']);
const MAX_LABEL = 72;

const fill = (phrase, fields) => phrase.replace(/\[([A-Z_]+)\]/g, (whole, name) => {
    const value = fields?.[name]?.value;
    return value === undefined ? whole : `[${value}]`;
});

const valueOf = (container, input, depth) => {
    const block = container?.getBlock(input?.block);
    if (!block) return '_';
    if (block.shadow) {
        const fields = Object.values(block.fields ?? {});
        if (fields.length !== 1) return '…';
        return fields[0].value === '' ? '""' : String(fields[0].value);
    }
    return expression(block, container, depth + 1);
};

function expression(block, container, depth) {
    const opcode = block.opcode;
    if (opcode === 'data_variable' || opcode === 'data_listcontents') {
        return `(${block.fields.VARIABLE?.value ?? block.fields.LIST?.value})`;
    }
    if (opcode === 'argument_reporter_string_number' || opcode === 'argument_reporter_boolean') return `(${block.fields.VALUE?.value})`;
    if (depth > 2) return '(…)';
    const infix = INFIX[opcode];
    if (infix) {
        const [left, right] = Object.values(block.inputs).map(input => valueOf(container, input, depth));
        const boolean = opcode === 'operator_equals' || opcode === 'operator_lt' || opcode === 'operator_gt' || opcode === 'operator_and' || opcode === 'operator_or';
        return boolean ? `<${left} ${infix} ${right}>` : `(${left} ${infix} ${right})`;
    }
    if (opcode === 'operator_not') return `<not ${valueOf(container, block.inputs.OPERAND, depth)}>`;
    const name = REPORTERS[opcode] ?? (opcode.split('_').slice(1).join(' ') || opcode);
    const fields = Object.values(block.fields ?? {}).map(field => `[${field.value}]`);
    const args = Object.entries(block.inputs).filter(([key]) => !BRANCHES.has(key)).map(([, input]) => valueOf(container, input, depth));
    return `(${[name, ...fields, ...args].filter(Boolean).join(' ')})`;
}

const callLabel = (block, container) => {
    const proccode = block.mutation?.proccode ?? block.opcode;
    if (!container) return proccode;
    let ids = [];
    try {
        ids = JSON.parse(block.mutation?.argumentids ?? '[]');
    } catch {
        return proccode;
    }
    let i = 0;
    return proccode.replace(/%[sbn]/g, () => {
        const input = block.inputs?.[ids[i++]];
        return input ? valueOf(container, input, 0) : '_';
    });
};

const clip = text => (text.length > MAX_LABEL ? `${text.slice(0, MAX_LABEL - 1)}…` : text);

export function blockLabel(block, container) {
    if (!block) return '?';
    const { opcode } = block;
    if (opcode === 'procedures_definition') {
        const prototype = container?.getBlock(block.inputs?.custom_block?.block);
        return clip(`define ${procedureName(prototype?.mutation?.proccode ?? '?')}`);
    }
    if (opcode === 'procedures_call') return clip(callLabel(block, container));
    if (opcode === 'procedures_prototype') return block.mutation?.proccode ?? opcode;
    const phrase = PHRASES[opcode];
    const head = phrase ? fill(phrase, block.fields) : opcode.split('_').slice(1).join(' ') || opcode;
    if (!container) return head;
    const args = Object.entries(block.inputs ?? {}).filter(([key]) => !BRANCHES.has(key)).map(([, input]) => valueOf(container, input, 0));
    return clip(args.length ? `${head} ${args.join(' ')}` : head);
}

export const scriptLabel = (container, topId) => blockLabel(container?.getBlock(topId), container);

export const procedureName = proccode => proccode.replace(/%[sbn]/g, '').replace(/\(\s*\)/g, '').replace(/\s+/g, ' ').trim() || proccode;

export const spriteName = name => (name.trim() === '' ? JSON.stringify(name) : name);

export function targetLabel(target) {
    if (!target) return '?';
    return target.isStage ? 'Stage' : spriteName(target.sprite.name);
}
