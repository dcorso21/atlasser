function useDrag(position, setPosition) {
    function handlePointerDown(e) {
        const el = e.target;
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        setPosition({
            ...position,
            active: true,
            offset: {
                x,
                y,
            },
        });
    }

    function handlePointerMove(e) {
        const bbox = e.target.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        if (position.active) {
            setPosition({
                ...position,
                x: position.x - (position.offset.x - x),
                y: position.y - (position.offset.y - y),
            });
        }
    }

    function handlePointerUp(e) {
        setPosition({
            ...position,
            active: false,
        });
    }

    return {
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerMove: handlePointerMove,
    };
}

export default useDrag;
