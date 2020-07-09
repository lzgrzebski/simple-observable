export function create(obsFn: (...fn: (() => void)[]) => void) {
    function subscribe(observer) {
        obsFn(observer);
    }

    function pipe(...obsFns) {
        return obsFns.reduce((acc, obsFn) => obsFn(acc), {
            subscribe,
        });
    }

    return {
        pipe,
        subscribe,
    };
}

export function map(mapFn) {
    return source => {
        return create(next => {
            source.subscribe(x => {
                console.log(mapFn);
                next(mapFn(x));
            });
        });
    };
}

export function filter(filterFn) {
    return source => {
        return create(next => {
            source.subscribe(x => {
                console.log(filterFn);
                if (filterFn(x)) {
                    next(x);
                }
            });
        });
    };
}

export function fromEvent(el: HTMLElement, eventType: string) {
    return create((next, error, complete) => {
        function handle(e) {
            next(e);
        }
        el.addEventListener(eventType, handle);

        return () => {
            el.removeEventListener(eventType, handle);
        };
    });
}

export function timeout(time: number) {
    return create((next, _error, complete) => {
        const setTimeoutRef = setTimeout(() => {
            next();
            complete();
        }, time);

        return () => {
            clearTimeout(setTimeoutRef);
        };
    });
}
