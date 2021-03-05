const HAWK = (() => {
    const _d = document, _p = performance;
    const _paramTypes = { string: 'string', bool:'boolean' };
    const _elTypes = { span:'SPAN', input:'INPUT', button:'BUTTON' };
    const _eventTypes = {
        c: 'click',
        fb: {
            f: 'focus',
            b: 'blur'
        },
        m: {
            o: 'mouseover',
            l: 'mouseleave'
        }
    };

    const _data = {
        meta: {},
        trackers: {}
    };

    const _createTrackObj = (id, type, reference) => {
        return {
            chunk: 1,
            elId: id,
            elRef: reference,
            elType: type,
            events: {
                focus: [[], []],
                mouse: [[], []],
                clicks: []
            },
            form: ''
        };
    };

    const _clickListen = (id) => {
        _data.trackers[id].events.clicks.push(_p.now());
    };

    const _focusListen = (id, i) => {
        _data.trackers[id].events.focus[i].push(_p.now());
    };

    const _mouseListen = (id, i) => {
        _data.trackers[id].events.mouse[i].push(_p.now());
    };

    const _addListeners = (id, type, reference) => {
        switch (type) {
            case _elTypes.button:
                reference.addEventListener(_eventTypes.c, () => {
                    _clickListen(id);
                });
                Object.keys(_eventTypes.m).forEach((key, i) => {
                    reference.addEventListener(_eventTypes.m[key], () => {
                        _mouseListen(id, i);
                    });
                });
                break;
            
            case _elTypes.span:
                Object.keys(_eventTypes.m).forEach((key, i) => {
                    reference.addEventListener(_eventTypes.m[key], () => {
                        _mouseListen(id, i);
                    });
                });
                break;
            
            case _elTypes.input:
                Object.keys(_eventTypes.m).forEach((key, i) => {
                    reference.addEventListener(_eventTypes.m[key], () => {
                        _mouseListen(id, i);
                    });
                });
                Object.keys(_eventTypes.fb).forEach((key, i) => {
                    reference.addEventListener(_eventTypes.fb[key], () => {
                        _focusListen(id, i);
                    });
                });
                break;
            
            default:
                break;
        };
    };

    const _checkConditions = (id, type) => {
        const idPass = (typeof id === _paramTypes.string);
        const acceptedElement = (Object.values(_elTypes).indexOf(type) > -1);
        return (idPass && acceptedElement);
    };

    const _track = (id) => {
        let elementRef = _d.getElementById(id);
        let elementType = elementRef.nodeName;

        if (_checkConditions(id, elementType)) {
            _data.trackers[id] = _createTrackObj(id, elementType, elementRef);
            _addListeners(id, elementType, elementRef);
        };
    };

    return {
        track(elementId) {
            _track(elementId);
        },
        results() {
            console.log(_data);
        }
    };
})();
