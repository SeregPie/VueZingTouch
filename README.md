# VueZingTouch

A wrapper for ZingTouch.

## dependencies

- [Vue](https://github.com/vuejs/vue)
- [ZingTouch](https://github.com/zingchart/zingtouch)

## setup

### npm

```shell
npm install vuezingtouch
```

### ES module

Register the directive globally.

```javascript
import Vue from 'vue';
import VueZingTouch from 'vuezingtouch';

Vue.directive(VueZingTouch.name, VueZingTouch);
```

*or*

Register the directive in the scope of a component.

```javascript
import VueZingTouch from 'vuezingtouch';

export default {
  directives: {
    [VueZingTouch.name]: VueZingTouch,
  },
  /*...*/
};
```

### browser

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuezingtouch"></script>
```

If Vue is detected, the directive will be registered automatically.

## usage

```vue
<template>
  <div
    v-zing-touch:swipe="onSwipe"
    style="
      align-items: center;
      background-color: yellow;
      display: flex;
      justify-content: center;
      touch-action: none;
    "
  >{{ pageIndex }}</div>
</template>
<script>
export default {
  data: {
    pageIndex: 0,
  },
  methods: {
    onSwipe(event) {
      if (event.detail[0].currentDirection === 180) {
        this.pageIndex++;   
      } else
      if (event.detail[0].currentDirection === 360) {
        this.pageIndex--;
      }
    },
  },
};
</script>
```

---

Override default options.

```html
<div
  v-zing-touch:tap="{
    maxDelay: 200,
    numInputs: 2,
    tolerance: 125,
    handler: onTap,
  }"
><!--...--></div>
```
