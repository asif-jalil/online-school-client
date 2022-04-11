import { useEffect, useRef } from "react";

function usePrevious(value) {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return typeof ref.current === "undefined" ? null : ref.current;
}

export default usePrevious;
