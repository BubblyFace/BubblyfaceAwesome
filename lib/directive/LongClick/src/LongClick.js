var isTouchConsumed = false;
var startTime;
var isLongClick;
var isTouchFinish;
var timeoutId;
var startY;
var startX;

export default {
    bind: function (el, binding) {
        el.value = binding.value

        if (el.hasBind) {
            return
        }

        el.hasBind = true

        el.addEventListener('touchstart', function (e) {
            startTime = new Date()
            isLongClick = false
            isTouchFinish = false
            isTouchConsumed = false

            if (e.touches && e.touches.length >= 1) {
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
            } else {
                startX = -1
                startY = -1
            }

            timeoutId = setTimeout(function () {
                if (!isTouchFinish && !isTouchConsumed) {
                    isLongClick = true
                    if (el.value && el.value.longClick) {
                        el.value.longClick()
                    }
                }
            }, 600)
        }, false);

        el.addEventListener('touchmove', function (e) {
            let newX = -1
            let newY = -1
            if (e.touches && e.touches.length >= 1) {
                newX = e.touches[0].clientX
                newY = e.touches[0].clientY
            }
            if (startX == -1 || newX == -1) {
                return
            }

            if (Math.abs(newX - startX) > 2 || Math.abs(newY - startY) > 2) {
                isTouchConsumed = true
            }
        }, false);

        el.addEventListener('touchend', function (e) {
            isTouchFinish = true
            clearTimeout(timeoutId)
            if (!isLongClick && !isTouchConsumed) {
                if (el.value && el.value.click) {
                    el.value.click()
                }
            }
        }, false);
    },
    //如果没有更新只是插入并不会调用update，所以把绑定clickListener放在bind中
    update: function (el, binding) {
        el.value = binding.value
    }
}

