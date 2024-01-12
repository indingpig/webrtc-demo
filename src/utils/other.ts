/**
 * Checks if a string is a valid JSON.
 * @param str - The string to check.
 * @returns True if the string is a valid JSON, false otherwise.
 */
export const isJson = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

/**
 * Represents a custom setInterval implementation.
 */
export class SetInterval {
	private _timer: number | null;
	constructor() {
		this._timer = null;
	}

	/**
	 * Starts the interval timer.
	 * @param fn - The function to be executed repeatedly.
	 * @param wait - The time interval between function executions.
	 */
	start(fn: () => void, wait: number | undefined) {
		this._timer = window.setTimeout(() => {
			fn();
			this.start(fn, wait);
		}, wait);
	}

	/**
	 * Clears the interval timer.
	 */
	clear() {
		if (this._timer) {
			clearTimeout(this._timer);
		}
	}
}