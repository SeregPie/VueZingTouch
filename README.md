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
    onSwipe([{currentDirection}]) {
      if (currentDirection === 180) {
        this.pageIndex++;   
      } else
      if (currentDirection === 360) {
        this.pageIndex--;
      }
    },
  },
};
</script>
```
