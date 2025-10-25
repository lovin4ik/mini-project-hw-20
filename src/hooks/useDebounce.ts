export const useDebounce = (func: Function, delay: number) => {
	let timeoutId: number
	return (...args: any[]) => {
		clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => {
			func.apply(null, args)
		}, delay)
	}
}
