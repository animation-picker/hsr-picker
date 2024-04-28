const custom = [

];


let member = custom;

export const empty = () => {
    return member.length === 0;
}

let pool = [];

const initPool = () => {
    member.forEach((name) => {
        pool.push({ name });
    });

    for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}

    console.log(pool);
};

initPool();

export const draw = (n) => {
    if (n == 1) {
        if (pool.length === 0) initPool();
        const m = pool.pop();
        return [m];
    }

    let res = [];

    if (n > pool.length) {
        pool.forEach((name) => {
            res.push({ name });
        });
        initPool();
    }

    let needN = n - res.length;
    if (needN <= 0) return res;

    for (let i = 0; i < needN; i++) {
        res.push(pool.pop());
    }

    return res;
}

