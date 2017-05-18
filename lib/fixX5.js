function addLocaleCompare() {
    try {
        '1'.localeCompare('1')
    } catch (e) {
        String.prototype.localeCompare = function (other) {
            var self = this.toString();
            if (!other) {
                return -1;
            }
            other = other.toString();

            var max = Math.max(other.length, self.length);
            for (var i = 0; i < max; i++) {
                if (self[i] > other[i]) {
                    return 1;
                } else if (self[i] < other[i]) {
                    return -1;
                }
            }

            return self.length > other.length ? 1 : self.length < other.length ? -1 : 0;
        };
    }
}

function fix() {
    addLocaleCompare();
}

fix();